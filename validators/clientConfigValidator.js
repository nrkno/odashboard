var _ = require('lodash');
var assert = require('assert');
var clientconfig = require('../config/clientconfig');
var config = require('../config/appconfig');

var pluginValidators = [];

function validateClientConfig() {
  loadPluginValidators(config.enabledPlugins);
  shouldHaveTabsOrRows(clientconfig);
  console.log('Validating widgets in client config');

  if (clientconfig.tabs) {
    _.each(clientconfig.tabs, function (tab) {
      _.each(tab, function (row) {
        validateRow(row);
      });
    });
  } else {
    _.each(clientconfig.rows, function (row) {
      validateRow(row);
    });
  }
}

function loadPluginValidators(enabledPlugins) {
  _.each(enabledPlugins, function (pluginName) {
    try {
      var pluginValidator = require('../src/plugins/' + pluginName + '/validator', function () { });
      pluginValidators[pluginName] = pluginValidator;
    } catch (e) {
      // continue
    }
  });
}

function validateRow(row) {
  _.each(row.widgets, function (widget) {
    validateWidget(widget);
  });
}

function validateWidget(widget) {
  shouldHavePlugin(widget);

  if (pluginValidators[widget.plugin] != undefined) {
    var pluginValidator = pluginValidators[widget.plugin];
    pluginValidator.validateWidget(widget);
  }
}

function shouldHavePlugin(widget) {
  assert(widget.plugin != undefined,
    'Plugin not defined for datasource with datsourceId %s', widget.datasourceId);
}

function shouldHaveTabsOrRows(clientConfig) {
  if (clientConfig.tabs === undefined) {
    console.log('Warning: clientconfig.tabs not defined. Assuming clientconfig.rows as only tab.');
    assert(clientConfig.rows != undefined, 'Critical error. No rows or tabs in client config.');
  } else if (clientConfig.tabs) {
    assert(clientConfig.tabs.constructor === Array, 'Tabs is not an array of rows.');
  }
}

var exports = module.exports = {};
exports.validateClientConfig = validateClientConfig;
