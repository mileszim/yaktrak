/** Dependencies */
var api   = require('./api');
var geo   = require('../geo');
var async = require('async');
var util  = require('../util');


/**
 * Yak API
 *
 * @param {string} user_id  - User id from previous session (md5 hash)
 * @param {object} location - Lat/long coordinates
 * @constructor
 */
var Yak = function(user_id, location) {
  if (typeof user_id === 'object') {
    this.user_id = Yak.generateID();
    this.location = user_id;
    api.registerAccount(this.user_id, this.location);
  } else {
    this.user_id  = user_id;
    this.location = location;
  }
};


Yak.prototype = {
  
  list: function() {
    api.list(this.user_id, this.location, function(yaks) {
      var recent = yaks.slice(0, 5);
      async.map(recent, function(msg, cb) {
        geo.locateMessage(msg, function(address) {
          cb(null, util.merge(msg, { address: address }));
        });
      }, function(err, res) {
        console.log(res);
      });
    });
  }
  
};


/**
 * Generate new ID
 *
 * @returns {string} MD5 hash
 */
Yak.generateID = function() {
  return crypto.createHash('md5').update(crypto.randomBytes(20)).digest('hex').toUpperCase();
};


/** Export */
module.exports = Yak;