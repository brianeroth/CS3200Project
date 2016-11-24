'use strict';

angular.module('cs3200project').controller('adminController', ['$scope', '$route', 'Data', '$routeParams', function($scope, $route, Data, $routeParams) {
  $scope.init = function() {
    Data.getCities()
      .then(function(res) {
        $scope.cities = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    Data.getAllCityImages()
      .then(function(res) {
        $scope.allCityImages = res.data;
        console.log($scope.allCityImages);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.deleteCity = function(id) {
    Data.deleteCity(id)
      .then(function(res) {
        $route.reload();
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
