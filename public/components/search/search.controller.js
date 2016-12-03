'use strict';

angular.module('cs3200project').controller('searchController', ['$scope', '$location', 'Data', function($scope, $location, Data) {
  $scope.init = function() {
    $scope.query = '';

    Data.getAllCityImages()
      .then(function(res) {
        $scope.allCityImages = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.search = function() {
    Data.search($scope.query)
      .then(function(res) {
        $scope.searchResults = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.getCityHeroImage = function(id) {
    for (var i = 0; i < $scope.allCityImages.length; i++) {
      if ($scope.allCityImages[i].image_city_id === id && $scope.allCityImages[i].image_type === 'hero') {
        return $scope.allCityImages[i].image_path;
      }
    }
  };

  $scope.init();
}]);
