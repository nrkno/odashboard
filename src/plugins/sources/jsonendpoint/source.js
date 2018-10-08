var httpclient = require('../../../../httpclient');
var assert = require('assert');
var util = require('util');

var JsonEndpointSource = function() {

  var source = {};

  source.validate = function(datasource) {
    assert(datasource.source === 'json-endpoint',
      util.format('Datasource.source should be \'json-endpoint\' for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.url !== undefined,
      util.format('Datasource.config.url is missing for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
  };

  source.refresh = function(datasource, callback) {
    var eventId = datasource.plugin + '.' + datasource.id;
    httpclient.get(datasource.config.url, datasource.auth, {'Accept': 'application/json'}, datasource.timeout)
      .then(function (result) {
        if (callback && typeof(callback) === 'function') {
          callback(JSON.parse(result.body));
        }
      })
      .catch(function (error) {
        console.log(util.format('JsonEndpointSource error %s : %s', datasource.id, error));
        if (callback && typeof(callback) === 'function') {
          callback(undefined);
        }
      });
  };

  return source;
};

module.exports = JsonEndpointSource;
