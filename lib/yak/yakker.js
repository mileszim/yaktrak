/** Dependencies */
var api   = require('./api');
var geo   = require('../geo');
var async = require('async');
var util  = require('../util');


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
};


Yakker.prototype = {
  
  list: function() {
    var self = this;
    api.list(this.user_id, this.location, function(yaks) {
      yaks.forEach(function(yak) {
        Switchboard.yaks.emit('fetched_yak', util.merge(yak, { school: self.school }));
      });
    });
  },
  
  
  locate: function(yak) {
    geo.locateMessage(msg, function(address) {
      Switchboad.yaks.emit('located_yak', util.merge(msg, { address: address }));
    });
  },
  
  
  comments: function(yak) {
    api.comments(this.user_id, this.location, yak.id, function(comments) {
      comments.forEach(function(comment) {
        Switchboad.yaks.emit('fetched_comment', yak, comment);
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