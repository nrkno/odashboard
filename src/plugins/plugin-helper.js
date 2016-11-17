var _ = require('lodash');

var PluginHelper = (function() {

  var module = {};

  module.addSaltToSrc = function (src) {
    var srcWithSalt;
    if (_.includes(src, '?')) {
      srcWithSalt = src + '&salt=' + new Date().getTime();
    } else {
      srcWithSalt = src + '?salt=' + new Date().getTime();
    }
    return srcWithSalt;
  };

  return module;
}());

module.exports = PluginHelper;
