/** Dependencies */
var util = require('./util.js');
var geo  = require('node-geocoder').getGeocoder('google', 'https', { apiKey: Config.geocode_key });


/**
 * Geocoding
 */
module.exports = {
  
  geocode: function(address, cb) {
    geo.geocode(address, function(err, res) {
      if (err) {
        util.log(err);
        return err;
      }
      
      var location = util.first(res);
      cb({ lat: location.latitude, long: location.longitude });
    });
  },
  
  
  locateMessage: function(msg, cb) {
    geo.reverse(msg.latitude, msg.longitude, function(err, res) {
			if (err) {
				util.log('Geo Error: ' + err);
				cb('Not Found: Geo Error');
				return;
			}
      var address = util.first(res.map(function(m) {
        if (!m.streetNumber) {
          return 'Not Found';
        }
        return m.streetNumber + ' ' + m.streetName + ', ' + m.city + ', ' + m.stateCode + ' ' + m.zipcode;
      }));
      cb(address);
    });
  }
  
};