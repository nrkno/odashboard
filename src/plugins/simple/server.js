var httpclient = require('../../../httpclient');
var validator = require('./validator');

var exports = module.exports = {};

function refreshDatasource(datasource, io) {
  var eventId = datasource.plugin + '.' + datasource.id;
  httpclient.get(datasource.url, datasource.auth, {}, datasource.timeout)
    .then(function (result) {
      io.emit(eventId, result.body);
    })
    .catch(function (error) {
      console.log('Simple %s : %s', datasource.id, error);
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

exports.name = 'simple';
exports.initDatasource = initDatasource;
exports.validate = validate;
