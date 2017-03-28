var httpclient = require('../../../httpclient');
var assert = require('assert');
var util = require('util');

var JsonEndpointSource = function() {

  var source = {};

  function validate(datasource) {
    assert(datasource.source === 'json-endpoint',
      util.format('Datasource.source should be \'json-endpoint\' for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.url !== undefined,
      util.format('Datasource.config.url is missing for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
  }

  function refresh(datasource, io) {
    var eventId = datasource.plugin + '.' + datasource.id;
    httpclient.get(datasource.config.url, datasource.auth, {}, datasource.timeout)
      .then(function (result) {
        io.emit(eventId, result.body);
      })
      .catch(function (error) {
        console.log(util.format('JsonEndpointSource error %s : %s', datasource.id, error));
        io.emit(eventId, undefined);
      });
  }

  source.start = function(datasource, io) {
    validate(datasource);
    setInterval(function() {
      refresh(datasource, io);
    }, datasource.updateInterval);
  };

  return source;
};

module.exports = JsonEndpointSource;
