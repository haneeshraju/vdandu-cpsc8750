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
let current = new Date();
app.get('/', (req, res) => {
  if(req.cookies['visitorId']){
  res.cookie('visitorId', nextVisitorId);}
  else
  res.cookie('visitorId', nextVisitorId++);
  res.cookie('visited', Date.now().toString());
  res.render('welcome', {
    name: req.query.name || "World",
    access_time: req.query.access_time || new Date().toLocaleString(),
    count: req.query.count || nextVisitorId,
    last_visit_time: req.query.last_visit_time || Math.round((new Date().getTime() - current.getTime()) / 1000),
  });
  current = new Date();
console.log(req.cookies);
});

// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");





