'use strict';

angular.module('cs3200project').controller('cityController', ['$scope', '$routeParams', 'Data' , function($scope, $routeParams, Data) {
  $scope.init = function() {
    Data.getCity($routeParams.id)
      .then(function(data) {
        $scope.city = data[0];
        console.log($scope.city);
      }, function(err) {
        console.log(err);
      });
  };

  $scope.init();
}]);
