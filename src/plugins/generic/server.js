var httpclient = require('../../../httpclient');
var validator = require('./validator');

var exports = module.exports = {};

function getDatasource(sourcename) {
  
  if (sourcename === 'json-endpoint') {
    var JsonEndpointSource = require('../sources/jsonendpoint.js');
    return JsonEndpointSource();
  }
  
  if (sourcename === 'azure-servicebus') {
    var AzureServiceBusSource = require('../sources/azureservicebus.js');
    return AzureServiceBusSource();
  }
  
  return undefined;  
}

function initDatasource(datasource, io) {
  var source = getDatasource(datasource.source);

  if (source === undefined) {
    console.log('Unable to create a datasource for ' + JSON.stringify(datasource));
  }
  else {
    source.start(datasource, io);
  }
}

function validate(datasource) {
  validator.validateDatasource(datasource);
}

exports.name = 'generic';
exports.initDatasource = initDatasource;
exports.validate = validate;
