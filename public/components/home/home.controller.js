'use strict';

angular.module('cs3200project').controller('homeController', ['$scope', 'Data', function($scope, Data) {
  $scope.init = function() {
    Data.getCities()
      .then(function(res) {
        $scope.cities = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.init();
}]);
