var _ = require('lodash');
var assert = require('assert');

var pluginValidators = [];

function validateWidgetConfig(appConfig, widgetConfig) {
  loadPluginValidators(appConfig.enabledPlugins);
  shouldHaveTabsOrRows(widgetConfig);
  console.log('Validating widgets in widget config');

  if (widgetConfig.tabs) {
    _.each(widgetConfig.tabs, function (tab) {
      _.each(tab, function (row) {
        validateRow(row);
      });
    });
  } else {
    _.each(widgetConfig.rows, function (row) {
      validateRow(row);
    });
  }

  console.log('Widget config ok');
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

function shouldHaveTabsOrRows(widgetConfig) {
  if (widgetConfig.tabs === undefined) {
    console.log('Warning: widgetConfig.tabs not defined. Assuming widgetConfig.rows as only tab.');
    assert(widgetConfig.rows != undefined, 'Critical error. No rows or tabs in client config.');
  } else if (widgetConfig.tabs) {
    assert(widgetConfig.tabs.constructor === Array, 'Tabs is not an array of rows.');
  }
}

var exports = module.exports = {};
exports.validateWidgetConfig = validateWidgetConfig;
