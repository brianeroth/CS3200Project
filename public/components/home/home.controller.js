'use strict';

angular.module('cs3200project').controller('homeController', ['$scope', function($scope) {
  $scope.init = function() {
    $scope.cities = [
        {
            city_name: 'London',
            country: 'United Kingdom'
        },
        {
            city_name: 'Boston',
            country: 'United States'
        },
        {
            city_name: 'Los Angeles',
            country: 'United States'
        },
        {
            city_name: 'Los Angeles',
            country: 'United States'
        }
    ]
  };

  $scope.init();
}]);
