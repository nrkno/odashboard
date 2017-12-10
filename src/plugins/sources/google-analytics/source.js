var util = require('util'),
  assert = require('assert'),
  google = require('googleapis'),
  _ = require('lodash');

var analytics = google.analytics('v3');
var authClient;

var GoogleAnalyticsSource = function() {

  var source = {};

  source.validate = function(datasource) {
    assert(datasource.source === 'google-analytics',
      util.format('Datasource.source should be \'google-analytics\' for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.keyFile !== undefined,
      util.format('Missing \'keyFile\' for Google Analytics datasource with id = %s', datasource.datasourceId));
    assert(datasource.config.viewId !== undefined,
      util.format('Missing \'viewId\' for Google Analytics datasource with id = %s', datasource.datasourceId));
    assert(datasource.config.metric !== undefined, 
      util.format('Missing \'metric\' for Google Analytics datasource with id = %s', datasource.datasourceId));
  };

  source.refresh = function(datasource, callback) {
    var config = datasource.config;
    gaRequest(config)
      .then(function (result) {  
        var retval = getValue(result.rows, config.metric, config.dimensions);
        callback(retval);
      })
      .catch(function (error) {
        console.log('Simple %s : %s', datasource.id, error);
      });
  };

  source.start = function(datasource) {
    var key = require('../../../../config/' + datasource.config.keyFile);
    authClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/analytics.readonly'],
      null
    );
  };

  function gaRequest(config) {
    return new Promise(function (resolve, reject) {
      authClient.authorize(function(err, tokens) {
        if (err) {
          reject(Error());
          return;
        }
        var getParams = {
          auth: authClient,
          'ids': config.viewId,
          'metrics': config.metric  
        };
        if (config.filters !== undefined) {
          getParams.filters = config.filters;
        }
        if (config.dimensions !== undefined) {
          getParams.dimensions = config.dimensions;
        }
        analytics.data.realtime.get(getParams, function(err, result) {
          if (err) {
            reject(Error(util.format('Unable to retrieve GA data: %s' ,err)));
          } else {
            resolve(result);
          }
        });   
      });
    });
  }

  function getValue (gaData, metric, dimensionValue) {
    
    var fields = {};
    if (dimensionValue == undefined) {
      fields = _.zipObject([metric], [gaData[0][0]]);
    } else {
      var props = _.map(gaData, function(v) { 
        return _.reduce(_.slice(v, 0, v.length-1), function(acc, vv) {
          return util.format('%s:%s', acc, vv);
        }, util.format('%s', metric));
      });
      var values = _.map(gaData, function(v) { return v[v.length-1]; });
      fields = _.zipObject(props, values);
    }
    return fields;
  }

  return source;
};

module.exports = GoogleAnalyticsSource;
