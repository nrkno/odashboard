var httpclient = require('../../../httpclient');

var exports = module.exports = {};

function refreshDatasource(datasource, io) {
  var eventId = datasource.plugin + '.' + datasource.id;
  var url = datasource.url + 'api/queues/%2f/' + datasource.queueName;
  httpclient.get(url, datasource.auth, undefined, datasource.timeout)
    .then(function(result) {
      io.emit(eventId, result.body);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function initDatasource(datasource, io) {
  setInterval(function() {
    refreshDatasource(datasource, io);
  }, datasource.updateInterval);
}

exports.name = 'rabbitmq';
exports.initDatasource = initDatasource;
