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
util.log('Starting Yakker.');
geo.geocode(Config.school, function(location) {
	util.log('School: ' + Config.school);
	util.log('Coordinates: ' + location.lat + ', ' + location.long);
	global.Yakker = new yakker(location, Config.school);
});


// Go
setTimeout(function() {
	Yakker.list();
}, 5000);