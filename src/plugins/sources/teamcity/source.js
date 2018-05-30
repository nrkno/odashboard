var request = require('request'),
  util = require('util'),
  assert = require('assert'),
  _ = require('lodash');

var TeamCitySource = function() {
  var source = {};

  source.validate = function(datasource) {

  };

  source.refresh = function(datasource, callback) {
    var buildMsg = {
      builds: [
        {
          buildTypeId: 'MyBuild',
          state: 'failed',
          startDate: '20161013T154551+0200',
          finishDate: '20161013T155110+0200',
          duration: 'PT2M10S',
          percent: 0,
          lastCommiter: 'knut'
        }
      ]
    };
    callback(buildMsg);
  };

  return source;
};

module.exports = TeamCitySource;