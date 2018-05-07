var  httpclient = require('../../../httpclient');
var validator = require('./validator');

var exports = module.exports = {};

function refreshDatasource(datasource, io) {
  var eventId = datasource.plugin + '.' + datasource.id;

  httpclient.get(datasource.url, datasource.auth, {}, 1500)
    .then(function (result) {
      io.emit(eventId, result.body);
    })
    .catch(function (error) {
      console.log('Chart %s: %s', datsource.id, error);
      io.emit(eventId, undefined);
    });
}

function initDatasource(datasource, io) {
  function refresh() {
    refreshDatasource(datasource, io);
  }
  setInterval(refresh, datasource.updateInterval);
  refresh();
}

function validate(datasource) {
  validator.validateDatasource(datasource);
}

exports.name = 'chart';
exports.initDatasource = initDatasource;
exports.validate = validate;
