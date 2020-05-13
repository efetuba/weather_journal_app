// Setup empty JS object to act as endpoint for all routes
projectData = [];
// Require Express to run server and routes
const express=require("express");
// Start up an instance of app
const app= express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors= require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=3000;
const server = app.listen(port, listening);
function listening(){
    console.log('server running');
    console.log(`running in localhost: ${port}`);
};
//GET route
app.get('/all', sendData);
 function sendData (req, res){
  res.send(projectData)
};
// POST route
app.post('/add',callBack);
function callBack(req, res){
    res.send('POST received');
}
//POST content info(weather+date+userResponse)
app.post('/addInfo', function(req, res){
    let newInfo={
        date: req.body.date,
        temperature: req.body.temperature,
        weather: req.body.weather,
        userResponse: req.body.userResponse
    };
    projectData.push(newInfo);
    res.send(projectData);
    console.log(newInfo);
})