// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

//* helper function
const listening = () => {
  console.log(`server running on port ${port}`);
};

const server = app.listen(port, listening);

app.post('/addData', (req, res) => {
  const data = req.body;
  projectData = data;
  console.log(projectData);
});

app.get('/fetchData', (req, res) => {
  res.send(projectData);
  console.log(projectData);
});
