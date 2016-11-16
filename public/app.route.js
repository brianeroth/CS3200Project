'use strict';

/**
 * AngularJS route module. If there's ever a new "section" added to the site, a new entry needs to be added here.
 * NOTE: AngularJS will break if either the "templateUrl" or the controller hasn't been defined yet, so be careful.
 */
angular.module('cs3200project').config(function($routeProvider, CONFIG) {
  $routeProvider
    .when('/', {
      templateUrl: 'components/home/views/home.html',
      controller: 'homeController'
    })
    .when('/city/:id', {
      templateUrl: 'components/city/views/city.html',
      controller: 'cityController'
    })
    .when('/login', {
      templateUrl: 'components/login/views/login.html',
      controller: 'loginController'
    })
    .when('/login/create', {
      templateUrl: 'components/login/views/create.html',
      controller: 'createController'
    })
    .when('/admin', {
      templateUrl: 'components/admin/views/admin.html',
      controller: 'adminController'
    })
    .when('/admin/edit/:id', {
      templateUrl: 'components/admin/views/edit.html',
      controller: 'adminEditController'
    });
});
