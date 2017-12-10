var httpclient = require('../../../../httpclient');
var assert = require('assert');
var util = require('util');

var RabbitMqSource = function() {

  var source = {};

  source.validate = function(datasource) {
    assert(datasource.source === 'rabbitmq',
      util.format('Datasource.source should be \'rabbitmq\' for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.url !== undefined,
      util.format('Datasource.config.url is missing for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.queue !== undefined,
      util.format('Datasource.config.queue is missing for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));  
  };

  source.refresh = function(datasource, callback) {
    var url = datasource.config.url + 'api/queues/%2f/' + datasource.config.queueName;
    httpclient.get(url, datasource.config.auth, undefined, datasource.timeout)
      .then(function(response) {
        var retval = parseResponse(datasource, response);
        if (callback && typeof(callback) === 'function') {
          callback(retval);
        }
      })
      .catch(function(error) {
        console.log(util.format('RabbitMq datasource error %s : %s', datasource.id, error));
        if (callback && typeof(callback) === 'function') {
          callback(undefined);
        }        
      });
  };

  function parseResponse(datasource, response) {
    var retval = {
      queueName: datasource.config.queueName,
      messageCount: response.messages
    };
    return retval;
  }

  return source;
};

module.exports = RabbitMqSource;
