var request = require('request'),
  util = require('util'),
  assert = require('assert'),
  crypto = require('crypto'),
  parseString = require('xml2js').parseString;

var AzureServiceBusSource = function() {

  var source = {};

  // Function which creates the Service Bus SAS token.
  var getToken = function(uri, sasKeyName, sasKey) {
    var endocedResourceUri = encodeURIComponent(uri);
    var t0 = new Date(1970, 1, 1, 0, 0, 0, 0);
    var t1 = new Date();
    var expireInSeconds = +(31 * 24 * 3600) + 3600 +
      (((t1.getTime() - t0.getTime()) / 1000) | 0);
    var plainSignature = (endocedResourceUri + '\n' + expireInSeconds).toString('utf8');
    var hash = crypto.createHmac('sha256', sasKey).update(plainSignature).digest('base64');
    var token = 'SharedAccessSignature sr=' + endocedResourceUri + '&sig=' +
      encodeURIComponent(hash) + '&se=' + expireInSeconds + '&skn=' +
      sasKeyName;
    return token;
  };

  source.validate = function(datasource) {
    if(datasource.config.queue){
      assert(datasource.config.topic == undefined,
        util.format('Conflicting properties: "queue" and "topic" are mutually exclusive, but has been defined for Azure Service Bus datasource with id = %s', datasource.datasourceId));
      assert(datasource.config.subscription == undefined,
        util.format('Conflicting properties: "queue" and "subscription" are mutually exclusive, but has been defined for Azure Service Bus datasource with id = %s', datasource.datasourceId));
    } else if(datasource.config.topic || datasource.config.subscription) {
      assert(datasource.config.topic != undefined,
        util.format('Missing topic for Azure Service Bus datasource with id = %s', datasource.datasourceId));
      assert(datasource.config.subscription != undefined,
        util.format('Missing subscription for Azure Service Bus datasource with id = %s', datasource.datasourceId));
    } else {
      assert(false,
        util.format('Missing topic/subscription or queue for Azure Service Bus datasource with id = %s', datasource.datasourceId));
    }
  };

  source.refresh = function(datasource, callback) {
    var config = datasource.config;

    var baseUri = 'https://' + config.namespace + '.servicebus.windows.net/';
    var entityPath = config.queue ? config.queue : config.topic + '/Subscriptions/' + config.subscription;
    var uri = baseUri + entityPath;

    var token = getToken(uri, config.sasKeyName, config.sasKey);

    request({
      uri: uri,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      timeout: datasource.timeout,
    }, function(error, response, body) {

      if (error || (response.statusCode < 200 || response.statusCode > 300)) {
        if (error && error.statusCode === 'ETIMEDOUT') {
          console.log(util.format('Timeout (%s) connecting to Azure Service Bus.', datasource.timeout));
        } else if (error) {
          console.log(util.format('Error connection to Azure Service Bus: %s', error));
        } else {
          console.log(util.format('Unable to get data from Azure Service Bus (%s): ${%d}', uri, response.statusCode));
        }
        return;
      }

      parseString(body, function(err, result) {
        if (err) {
          return;
        }
        if (result == undefined || result.entry === undefined) {
          console.log(util.format('Unexpected result from Azure Service Bus (%s)', uri));
          return;
        }

        var content = result.entry.content[0];
        var messageCountString = content.QueueDescription ? content.QueueDescription[0].MessageCount[0] : content.SubscriptionDescription[0].MessageCount[0];
        var messageCount = parseInt(messageCountString);

        if (callback && typeof(callback) === 'function') {
          callback({ messageCount: messageCount });
        }
      });
    });
  };

  return source;
};

module.exports = AzureServiceBusSource;
