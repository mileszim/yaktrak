/** Dependencies */
var events = require('events');
var util   = require('./util');



/**
 * Switchboard
 *
 * @constructor
 */
var Switchboard = function() {
	
	this.yaks = new events.EventEmitter();
	
};


/** Export */
module.exports = Switchboard = new Switchboard();