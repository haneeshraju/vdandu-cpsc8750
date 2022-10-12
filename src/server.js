// use the express library
const express = require('express');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;

// The main page of our website
app.use(express.static('public'));
app.set('view engine', 'ejs');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
let nextVisitorId = 1;
let vmsg = "";
let current = new Date();
app.get('/', (req, res) => {
  let current = req.cookies.visited;
  if(current==null){
  vmsg = "You have never visited before.";
  }
  else {
  current = Math.floor((Date.now() - req.cookies.visited)/1000);
  vmsg = "It has been ${current} seconds since your last visit";
  }
  if(req.cookies['visitorId']){
  res.cookie('visitorId', nextVisitorId);}
  else
  res.cookie('visitorId', nextVisitorId++);
  res.cookie('visited', Date.now().toString());
  res.render('welcome', {
    name: req.query.name || "World",
    access_time:new Date().toLocaleString(),
    count: nextVisitorId,
    vmsg: vmsg
  });
console.log(req.cookies);
});

// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");





