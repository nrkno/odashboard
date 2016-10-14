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
  setInterval(function() {
    refreshDatasource(datasource, io);
  }, datasource.updateInterval);
}

function validate(datasource) {
  validator.validateDatasource(datasource);
}

exports.name = 'chart';
exports.initDatasource = initDatasource;
exports.validate = validate;
