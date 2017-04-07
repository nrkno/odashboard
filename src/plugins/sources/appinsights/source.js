var request = require('request'),
  util = require('util'),
  assert = require('assert'),
  _ = require('lodash');

var AppInsightsSource = function() {

  var source = {};

  function validate(datasource) {
    assert(datasource.source === 'app-insights',
      util.format('Datasource.source should be \'app-insights\' for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.endpoint !== undefined,
      util.format('Datasource.config.endpoint is missing for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.method !== undefined,
      util.format('Datasource.config.method is missing for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.appid !== undefined,
      util.format('Datasource.config.appid is missing for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.apikey !== undefined,
      util.format('Datasource.config.apikey is missing for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
  }

  function createUri(config) {

    var endpt = config.endpoint[0] === '/' ? config.endpoint : '/' + config.endpoint;
    var uriTemplate = 'https://api.applicationinsights.io/beta/apps/%s%s';

    var uri = util.format(uriTemplate, config.appid, endpt);

    var params = Object.getOwnPropertyNames(config.parameters);
    if (params.length > 0) {
      var pairs = _.map(params, function (p) {
        return util.format('%s=%s', p, encodeURIComponent(config.parameters[p]));
      });

      uri = uri + '?' + pairs.join('&');
    }

    return uri;
  }

  function createValueMapper(columns) {
    return function(row) {
      var result = {};
      _.forEach(columns, function (column, idx) {
        var key = column.ColumnName;
        result[key] = row[idx];
      });
      return result;
    };
  }

  function parse(body) {
    var jobj = JSON.parse(body);
    var table = jobj.Tables[0];
    var mapper = createValueMapper(table.Columns);
    var values = _.map(table.Rows, mapper);
    return {
      values: values
    };
  }

  function refresh(datasource, io) {

    var eventId = datasource.plugin + '.' + datasource.id;
    var config = datasource.config;
    
    var uri = createUri(config);

    request({
      uri: uri,
      headers: {
        'x-api-key': config.apikey
      },
      timeout: datasource.timeout,
    },  function (error, response, body) {

      if (error || (response.statusCode < 200 || response.statusCode > 300)) {
        if (error && error.statusCode === 'ETIMEDOUT') {
          console.log(util.format('Timeout (%s) connecting to Application Insights.', datasource.timeout));
        } else if (error) {
          console.log(util.format('Error connection to Application Insights: %s', error));
        } else {
          console.log(util.format('Unable to get data from Application Insights (%s): ${%d}', uri, response.statusCode));
        }
        return;
      }

      var msg = JSON.stringify(parse(body));

      io.emit(eventId, msg);
    });
  }

  source.start = function(datasource, io) {
    validate(datasource);
    setInterval(function() {
      refresh(datasource, io);
    }, datasource.updateInterval);
  };

  return source;
};

module.exports = AppInsightsSource;
