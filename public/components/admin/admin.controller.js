'use strict';

/* eslint-disable camelcase */
/* eslint-disable dot-notation */
angular.module('cs3200project').controller('adminController', ['$scope', '$route', 'Data', '$routeParams', function($scope, $route, Data, $routeParams) {
  $scope.init = function() {
    $scope.newCity = {
      city_name: '',
      city_description: '',
      city_country: '',
      city_state: ''
    };

    $scope.newInterestType = '';

    Data.getAllPlaces()
      .then(function(res) {
        $scope.places = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    Data.getInterestTypes()
      .then(function(res) {
        $scope.interest_types = res.data;
        for (var i = 0; i < Object.keys($scope.interest_types).length; i++) {
          $scope.interest_types[i]["places"] = [];
        }
      })
      .catch(function(err) {
        console.log(err);
      });
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

  $scope.createInterestType = function() {
    Data.createInterestType($scope.newInterestType)
      .then(function(res) {
        $route.reload();
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.saveInterestTypeForPlaces = function(interest) {
    Data.saveInterestTypeForPlaces(interest)
      .then(function(res) {
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.deleteInterestType = function(interest_id) {
    Data.deleteInterestType(interest_id)
      .then(function(res) {
        $route.reload();
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.createCity = function() {
    if (!$scope.newCity.city_name || !$scope.newCity.city_country || !$scope.newCity.city_state) {
      $scope.errorMessage = 'Missing a required field to create a city.';
    }

    Data.createCity($scope.newCity)
      .then(function(res) {
        $route.reload();
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.init();
}]);
