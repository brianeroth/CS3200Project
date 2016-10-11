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
});
