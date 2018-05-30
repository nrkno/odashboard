var httpclient = require('../../../httpclient');
var validator = require('./validator');
var _ = require('lodash');

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

  if (sourcename === 'rabbitmq') {
    var RabbitMqSource = require('../sources/rabbitmq/source.js');
    return RabbitMqSource();
  }

  if (sourcename === 'app-insights') {
    var AppInsightsSource = require('../sources/appinsights/source.js');
    return AppInsightsSource();
  }

  if (sourcename === 'google-analytics') {
    var GoogleAnalyticsSource = require('../sources/google-analytics/source.js');
    return GoogleAnalyticsSource();
  }

  if (sourcename === 'teamcity') {
    var TeamCitySource = require('../sources/teamcity/source.js');
    return TeamCitySource();
  }
  
  return undefined;  
}

function getTransform(transform) {
  if (transform && typeof(transform) === 'function') {
    return transform;
  }

  return _.identity;
}

function start(source, datasource, io) {
  source.validate(datasource);
  if (source.start !== undefined) {
    source.start(datasource);
  }
  var eventId = datasource.plugin + '.' + datasource.id;
  var transform = getTransform(datasource.transform);
  function refresh() {
    source.refresh(datasource, function(value) {
      var v = transform(value);
      var msg = JSON.stringify(v);
      io.emit(eventId, msg);
    });
  }
  setInterval(refresh, datasource.updateInterval);
  refresh();
}

function initDatasource(datasource, io) {
  var source = getDatasource(datasource.source);

  if (source === undefined) {
    console.log('Generic server: No datasource defined for sourcename ' + datasource.source + ' (' + JSON.stringify(datasource) + ')');
  }
  else {
    start(source, datasource, io);
  }
}

function validate(datasource) {
  validator.validateDatasource(datasource);
}

exports.name = 'generic';
exports.initDatasource = initDatasource;
exports.validate = validate;
