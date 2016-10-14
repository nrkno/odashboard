var _ = require('lodash');
var assert = require('assert');
var clientconfig = require('../config/clientconfig');
var config = require('../src/config');

var pluginValidators = [];

function validateClientConfig() {
  loadPluginValidators();
  console.log('Validating widgets in client config');
  _.each(clientconfig.rows, function (row) {
    _.each(row.widgets, function (widget) {
      validateWidget(widget);
    });
  });
}

function loadPluginValidators() {
  _.each(config.enabledPlugins, function (pluginName) {
    try {
      var pluginValidator = require('../src/plugins/' + pluginName + '/validator', function () { });
      pluginValidators[pluginName] = pluginValidator;
    } catch (e) {
      // continue
    }
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

var exports = module.exports = {};
exports.validateClientConfig = validateClientConfig;
