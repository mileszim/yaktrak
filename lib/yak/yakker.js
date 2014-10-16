/** Dependencies */
var api    = require('./api');
var geo    = require('../geo');
var async  = require('async');
var util   = require('../util');
var crypto = require('crypto');


/**
 * Yakker API
 *
 * @param {string} user_id  - User id from previous session (md5 hash)
 * @param {object} location - Lat/long coordinates
 * @constructor
 */
var Yakker = function(location, school) {
  this.user_id  = Yakker.generateID();
  this.location = location;
  this.school   = school;
  
  // Register new account
  process.nextTick(function() {
    api.registerAccount(this.user_id, this.location);
  }.bind(this));
};


Yakker.prototype = {
  
  list: function() {
    util.log('Getting yaks...');
    var self = this;
    api.list(this.user_id, this.location, function(yaks) {
      yaks.forEach(function(yak) {
        Switchboard.yaks.emit('fetched_yak', util.merge(yak, { school: self.school }));
      });
    });
  },
  
  
  locate: function(yak) {
    geo.locateMessage(yak, function(address) {
      Switchboard.yaks.emit('located_yak', util.merge(yak, { address: address }));
    });
  },
  
  
  comments: function(yak) {
    api.comments(this.user_id, this.location, yak.id, function(comments) {
      comments.forEach(function(comment) {
        Switchboard.yaks.emit('fetched_comment', yak, comment);
      });
    });
  }
  
};


/**
 * Generate new ID
 *
 * @returns {string} MD5 hash
 */
Yakker.generateID = function() {
  return crypto.createHash('md5').update(crypto.randomBytes(20)).digest('hex').toUpperCase();
};


/** Export */
module.exports = Yakker;