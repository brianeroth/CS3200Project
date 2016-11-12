'use strict';

angular.module('cs3200project').controller('homeController', ['$scope', 'Data', function($scope, Data) {
  $scope.init = function() {
    Data.getCities()
      .then(function(data) {
        $scope.cities = data;
      }, function(err) {
        console.log(err);
      });
  };

  $scope.init();
}]);
