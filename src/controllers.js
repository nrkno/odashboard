var app = require('./app');
var config = require('../config/appconfig.js');
var clientConfig = require('../config/clientconfig.js');
var _ = require('lodash');

var myController = app.controller('PluginController', function($rootScope, $scope, $interval, $timeout, $http, $location, $sce, socket) {
  $rootScope.title = clientConfig.title;
  var transformedConfig = transformConfig(clientConfig);
  $scope.tabs = parseRows(clientConfig, $interval, $http, socket);

  if (clientConfig.snow) {
    var snowNode = document.createElement('div');
    snowNode.setAttribute('id', 'snow');
    document.body.appendChild(snowNode);
  }
  // Tab handling
  var tabCycle;
  $scope.isCycling = false;
  $scope.tabIndex = 0;
  $scope.hasTabs = function () { return $scope.tabs.length > 1; };
  console.log($scope.hasTabs());
  $scope.nextTab = function () { $scope.tabIndex = ($scope.tabIndex + 1) % $scope.tabs.length; };
  $scope.prevTab = function () { $scope.tabIndex = ($scope.tabIndex - 1) % $scope.tabs.length; };
  $scope.pauseTabCycle = function () {
    if (!angular.isDefined(tabCycle)) return;
    $interval.cancel(tabCycle);
    $scope.isCycling = false;
    tabCycle = undefined;
  };
  $scope.startTabCycle = function () {
    if (angular.isDefined(tabCycle)) return;
    $scope.isCycling = true;
    tabCycle = $interval(function() {
      $scope.nextTab();
    }, config.tabCycleInterval);
  };

  $scope.trustAsResourceUrl = $sce.trustAsResourceUrl;
});

var pluginModules = {};

config.enabledPlugins.forEach(function (pluginName) {
  try {
    addAppDirective(pluginName);
    requireModule(pluginName);
  }
  catch (err) {
    console.log('Failed to load module for plugin ' + pluginName + '(' + JSON.stringify(err) + ')');
  }
});

function addAppDirective(pluginName) {
  try {
    var directiveName = pluginName.replace('-', '') + 'dir';

    app.directive(directiveName, function () {
      return {
        restrict: 'E',
        templateUrl: 'plugins/'+pluginName+'/'+pluginName+'.html'
      };
    });
  }
  catch (err) {
    console.log('Failed to add app directive for plugin ' + pluginName + '(' + JSON.stringify(err) + ')');
  }
}

function requireModule(pluginName) {
  pluginModules[pluginName] = require('./plugins/' + pluginName + '/index') ;
}

function transformConfig(clientConfig) {

  // Backwards compatibility with old
  if (clientConfig.tabs == undefined && clientConfig.rows != undefined) {
    clientConfig.tabs = [clientConfig.rows];
  }

  _.each(clientConfig.tabs, function (tab) {
    _.each(tab, function (row) {
      _.each(row.widgets, function(widget) {
        _.each(config.widgetDefaults, function (defaultValue, key) {
          if (widget[key] === undefined) {
            widget[key] = defaultValue;
          }
        });
      });
    });
  });

  return clientConfig;
}

function parseRows(clientConfig, $interval, $http, socket) {
  var tabs = [];
  _.each(clientConfig.tabs, function (tab) {
    var rows = [];
    _.each(tab, function (row) {
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
    tabs.push(createTab(tab.title, rows));
  });

  return tabs;
}

function createRow(title, widgets) {
  return {
    title: title,
    widgets: widgets
  };
}

function createTab(title, rows) {
  return {
    title: title,
    rows: rows
  };
}

module.exports = myController;
