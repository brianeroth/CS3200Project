'use strict';

angular.module('cs3200project').controller('headerController', ['$scope', 'CONFIG', function($scope, CONFIG) {
  $scope.init = function() {
    $scope.siteName = CONFIG.SITE_NAME;
  };

  $scope.init();
}]);
