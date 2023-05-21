/* Global Variables */
// Personal API Key for OpenWeatherMap API
const personalKey = 'b5b0183fb673701ba489f7d8dfc13968';
const apiKey = `${personalKey}&units=imperial`;

const zipCodeInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');

const generateBtn = document.getElementById('generate');

const imgContainerEl = document.getElementById('img-container');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const contentEl = document.getElementById('content');
const countryEl = document.getElementById('country');
const conditionEl = document.getElementById('condition');
const imgEl = document.createElement('img');

const errMsgEl = document.getElementById('error');

const imgsArr = [
  'Clear',
  'Clouds',
  'Drizzle',
  'Mist',
  'Thunderstorm',
  'Rain',
  'Snow',
];

console.log(imgEl);
//* Create a new date instance dynamically with JS
let date = new Date();
let newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

/* Helper Functions */
const resetEls = () => {
  dateEl.innerHTML = '';
  tempEl.innerHTML = '';
  contentEl.innerHTML = '';
  countryEl.textContent = '';
  conditionEl.textContent = '';
  errMsgEl.textContent = '';
  imgEl.remove();
};

//* set image
const setImage = (desc) => {
  const value = imgsArr.some((img) => {
    return desc === img;
  });
  if (!value) imgEl.src = 'imgs/Mist.png';
  else imgEl.src = `imgs/${desc}.png`;
};

//* update ui
const updateUI = (data) => {
  resetEls();
  if (data.temperature) {
    setImage(data.description);
    imgEl.classList.add('img-condition');
    imgContainerEl.append(imgEl);
    dateEl.innerHTML = data.date;
    tempEl.innerHTML = `${Math.round(data.temperature)} Degrees`;
    contentEl.innerHTML = data.feelings;
    countryEl.textContent = data.countryName;
    conditionEl.textContent = data.description;
  } else {
    errMsgEl.textContent = 'Try Again!';
  }
};

const formApiLink = () => {
  const zipCode = zipCodeInput.value;
  return `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
};

const handleRequests = (URL) => {
  getApiData(URL).then((data) => {
    postData(data, '/addData');
    getProjectData('/fetchData');
  });
};

const handleClick = () => {
  const URL = formApiLink();
  handleRequests(URL);
};

//* Function to GET Web API Data
const getApiData = async (URL) => {
  const res = await fetch(URL);
  try {
    const data = await res.json();
    const feelings = feelingsInput.value;
    console.log(data);
    const apiData = {
      feelings,
      date: newDate,
      temperature: data.main.temp,
      countryName: data.name,
      description: data.weather[0].main,
    };
    return apiData;
  } catch (err) {
    console.log(err, 'try another code');
  }
};

//* Function to POST data
const postData = async (data, URL) => {
  const res = await fetch(URL, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

//* Function to GET Project Data
const getProjectData = async (URL) => {
  const res = await fetch(URL);
  try {
    const data = await res.json();
    console.log(data);
    updateUI(data);
  } catch (err) {
    console.log(err.message);
  }
};

//* btn event
generateBtn.addEventListener('click', handleClick);
