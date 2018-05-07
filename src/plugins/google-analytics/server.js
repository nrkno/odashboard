var google = require('googleapis');
var _ = require('lodash');
var util = require('util');

var analytics = google.analytics('v3');
var validator = require('./validator');

var exports = module.exports = {};
var authClient;

function initDatasource(datasource, io) {

  var key = require('../../../config/' + datasource.keyFile);
  authClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'],
    null
  );

  function refresh() {
    refreshDatasource(datasource, io);
  }
  setInterval(refresh, datasource.updateInterval);
  refresh();
}

function gaRequest(viewId, metrics, filters, dimensions) {
  return new Promise(function (resolve, reject) {
    authClient.authorize(function(err, tokens) {
      if (err) {
        reject(Error());
        return;
      }
      var getParams = {
        auth: authClient,
        'ids': viewId,
        'metrics': metrics
      };
      if (filters !== undefined) {
        getParams.filters = filters;
      }
      if (dimensions !== undefined) {
        getParams.dimensions = dimensions;
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

function refreshDatasource(datasource, io) {
  var eventId = datasource.plugin + '.' + datasource.id;
  gaRequest(datasource.viewId, datasource.metric, datasource.filters, datasource.dimension)
    .then(function (result) {
      io.emit(eventId, JSON.stringify(result.rows));
    })
    .catch(function (error) {
      console.log('Simple %s : %s', datasource.id, error);
    });
}

function validate(datasource) {
  validator.validateDatasource(datasource);
}

exports.name = 'google-analytics';
exports.initDatasource = initDatasource;
exports.validate = validate;


