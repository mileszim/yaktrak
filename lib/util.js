/** Dependencies */
var _    = require('lodash');
var util = require('util');



/**
 * Util
 */
var Util = {
  
  /**
   * Sort object
   * Muchas gracias Zackehh - http://zackehh.com/sorting-object-recursively-node-jsjavascript/
   *
   * @params {object} object - Object to sort
   */
  sortObject: function(object) {
    var sortedObj = {};
    var keys = _.keys(object);
    
    keys = _.sortBy(keys, function(key){
        return key;
    });

    _.each(keys, function(key) {
        if(typeof object[key] == 'object' && !(object[key] instanceof Array)){
            sortedObj[key] = sortObject(object[key]);
        } else {
            sortedObj[key] = object[key];
        }
    });

    return sortedObj;
  },
  
  
  
  /**
   * Deep Clone & Merge
   *
   * @params  {object} object - Object 1
   * @params  {object} source - Object 2
   * @returns {object}
   */
  deepMerge: function(object, source) {
    return _.merge(_.cloneDeep(object), _.cloneDeep(source));
  }
  
};



/** Extend */
_.extend(Util, util);
_.extend(Util, _);


/** Export */
module.exports = Util;