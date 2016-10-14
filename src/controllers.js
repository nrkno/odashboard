var app = require('./app');
var config = require('./config');
var clientConfig = require('../config/clientconfig.js');
var _ = require('lodash');

var myController = app.controller('PluginController', function($rootScope, $scope, $interval, $timeout, $http, $location, $sce, socket) {
  $rootScope.title = clientConfig.title;
  var transformedConfig = transformConfig(clientConfig);
  $scope.rows = parseRows(transformedConfig, $interval, $http, socket);
  $scope.trustAsResourceUrl = $sce.trustAsResourceUrl;
});

var pluginModules = {};

config.enabledPlugins.forEach(function (pluginName) {
  addAppDirective(pluginName);
  requireModule(pluginName);
});

function addAppDirective(pluginName) {
  var directiveName = pluginName.replace('-', '') + 'dir';

  app.directive(directiveName, function () {
    return {
      restrict: 'E',
      templateUrl: 'plugins/'+pluginName+'/'+pluginName+'.html'
    };
  });
}

function requireModule(pluginName) {
  pluginModules[pluginName] = require('./plugins/' + pluginName + '/index') ;
}

function transformConfig(clientConfig) {
  _.each(clientConfig.rows, function (row) {
    _.each(row.widgets, function(widget) {
      _.each(config.widgetDefaults, function (defaultValue, key) {
        if (widget[key] === undefined) {
          widget[key] = defaultValue;
        }
      });
    });
  });

  return clientConfig;
}

function parseRows(clientConfig, $interval, $http, socket) {
  var rows = [];
  _.each(clientConfig.rows, function (row) {
    var widgets = [];
    _.each(row.widgets, function(widget) {
      var plugin = pluginModules[widget.plugin];
      if (plugin !== undefined)
          {
        var newWidget = plugin.createWidget(widget, socket);
        widgets.push(newWidget);
      }
    });
    rows.push(createRow(row.title, widgets));
  });

  return rows;
}

function createRow(title, widgets) {
  return {
    title: title,
    widgets: widgets
  };
}

module.exports = myController;
