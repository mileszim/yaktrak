// Init
var util = require('./util');
util.log('Starting YakTrak...');


// Globals
global.Config      = require('../config.js');
global.Mongoose    = require('mongoose');
global.Switchboard = require('./switchboard');


// Dependencies
var Yakker = require('./yak');


// Load Models
global.Yak = require('./models/yak');


// Connect DB
util.log('Connecting to MongoDB...');
Mongoose.connect(Config.db);

