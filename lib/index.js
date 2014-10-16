// Init
var util = require('./util');
util.log('Starting YakTrak...');


// Globals
global.Config      = require('../config.js');
global.Mongoose    = require('mongoose');
global.Switchboard = require('./switchboard');


// Dependencies
var yakker    = require('./yak');
var listeners = require('./listeners');
var geo       = require('./geo');


// Load Models
global.Yak = require('./models/yak');


// Connect DB
util.log('Connecting to MongoDB...');
Mongoose.connect(Config.db);


// Connect Yakker
util.log('Initializing Yakker client.');
geo.geocode(Config.school, function(location) {
	util.log('School: ' + Config.school);
	util.log('Coordinates: ' + location.lat + ', ' + location.long);
	global.Yakker = new yakker(location, Config.school);
});


// Listen for yaks
util.log('Yak listener: started');
(function loop() {
	var random_wait = Math.round(1 + Math.random() * 10000) + 5000;
  setTimeout(function() {
	  Yakker.list();
	  loop();  
  }, random_wait);
}());


// Start Express
util.log('Starting Express.');
var express = require('./express');