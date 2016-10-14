//'use strict';
var angular = require('angular');
var app = angular.module('odashboard', [require('angular-route')]);

app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
        when('/overview', {
          templateUrl: 'partials/Overview.html'
        }).
        otherwise({
          redirectTo: '/overview'
        });
  }]);

app.factory('socket', ['$rootScope', function ($rootScope) {
  var socket = io.connect();

  return {
    on: function (eventName, callback) {
      function wrapper() {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      }

      socket.on(eventName, wrapper);

      return function () {
        socket.removeListener(eventName, wrapper);
      };
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}]);

module.exports = app;
