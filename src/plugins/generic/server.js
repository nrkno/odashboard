var httpclient = require('../../../httpclient');
var validator = require('./validator');

var exports = module.exports = {};

function getDatasource(sourcename) {
  
  if (sourcename === 'json-endpoint') {
    var JsonEndpointSource = require('../sources/jsonendpoint/source.js');
    return JsonEndpointSource();
  }
  
  if (sourcename === 'azure-servicebus') {
    var AzureServiceBusSource = require('../sources/azureservicebus/source.js');
    return AzureServiceBusSource();
  }

  if (sourcename === 'app-insights') {
    var AppInsightsSource = require('../sources/appinsights/source.js');
    return AppInsightsSource();
  }
  
  return undefined;  
}

function initDatasource(datasource, io) {
  var source = getDatasource(datasource.source);

  if (source === undefined) {
    console.log('Generic server: No datasource defined for sourcename ' + datasource.source + ' (' + JSON.stringify(datasource) + ')');
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
