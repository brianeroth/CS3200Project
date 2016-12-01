'use strict';

/* eslint-disable camelcase */
angular.module('cs3200project').controller('adminEditController', ['$scope', '$routeParams', '$route', 'Data', function($scope, $routeParams, $route, Data) {
  $scope.init = function() {
    $scope.newImg = {
      image_path: '',
      image_type: '',
      image_city_id: $routeParams.id
    };

    $scope.newPlaceType = 'landmark';

    $scope.newPlace = {
      place_name: '',
      place_description: '',
      place_address: '',
      place_price_range: '',
      place_external_resource: '',
      place_image: '',
    };

    $scope.newLandmark = {
      landmark_cost: ''
    };

    $scope.newEvent = {
      event_cost: '',
      event_date: null
    };

    $scope.newRestaurant = {
      restaurant_cuisine_type: ''
    };

    Data.getCity($routeParams.id)
      .then(function(res) {
        $scope.city = res.data[0];
      })
      .catch(function(err) {
        console.log(err);
      });
    Data.getPlacesInCity($routeParams.id, 'landmarks')
      .then(function(res) {
        $scope.landmarks = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    Data.getPlacesInCity($routeParams.id, 'restaurants')
      .then(function(res) {
        $scope.restaurants = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    Data.getPlacesInCity($routeParams.id, 'hotels')
      .then(function(res) {
        $scope.hotels = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    Data.getPlacesInCity($routeParams.id, 'events')
      .then(function(res) {
        $scope.events = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    Data.getCityImages($routeParams.id)
      .then(function(res) {
        $scope.cityImages = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.saveCity = function() {
    Data.saveCity($scope.city, $scope.cityImages, $scope.newImg)
      .then(function(res) {
        $route.reload();
      })
      .catch(function(err) {
      });
  };

  $scope.deletePlace = function(id) {
    Data.deletePlace(id)
      .then(function(res) {
        $route.reload();
      })
      .catch(function(err) {
      });
  };

  $scope.deleteImg = function(id) {
    Data.deleteImage(id)
      .then(function(res) {
        $route.reload();
      })
      .catch(function(err) {
      });
  };

  $scope.createPlace = function() {
    console.log($scope.newPlace);

    if ($scope.newPlaceType == 'landmark') {
      console.log($scope.newLandmark);
    } else if ($scope.newPlaceType == 'event') {
      console.log($scope.newEvent);
    } else if ($scope.newPlaceType == 'restaurant') {
      console.log($scoep.newRestaurant);
    }
  }

  $scope.init();
}]);
