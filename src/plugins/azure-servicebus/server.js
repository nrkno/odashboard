var request = require('request'),
  util = require('util'),
  crypto = require('crypto'),
  parseString = require('xml2js').parseString;

var exports = module.exports = {};

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

function initDatasource(datasource, io) {

  function refresh() {
    var eventId = datasource.plugin + '.' + datasource.id;

    var uri = 'https://' + datasource.namespace +
      '.servicebus.windows.net/' + datasource.topic + '/Subscriptions/' + datasource.subscription;

    var token = getToken(uri, datasource.sasKeyName, datasource.sasKey);

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

        var messageCountString = result.entry.content[0].SubscriptionDescription[0].MessageCount[0];
        var messageCount = parseInt(messageCountString);

        io.emit(eventId, JSON.stringify({
          messageCount: messageCount
        }));
      });
    });

  }
  setInterval(refresh, datasource.updateInterval);
  refresh();
}

exports.name = 'azure-servicebus';
exports.initDatasource = initDatasource;
