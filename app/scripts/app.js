'use strict';

/**
 * @ngdoc overview
 * @name xbApp
 * @description
 * # xbApp
 *
 * Main module of the application.
 */
angular
  .module('xbApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider,localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('xbApp');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
