'use strict';

var angular = require('angular');

var app = angular.module('odashboard', [
  'ngRoute',
  'odashboard.services'
]);

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
