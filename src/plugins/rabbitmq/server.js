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
      console.log('Failed fetching data for datasource: %s and url: %s , with error: %s', datasource.id, url, error);
    });
}

function initDatasource(datasource, io) {
  function refresh() {
    refreshDatasource(datasource, io);
  }
  setInterval(refresh, datasource.updateInterval);
  refresh();
}

exports.name = 'rabbitmq';
exports.initDatasource = initDatasource;
