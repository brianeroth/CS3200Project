'use strict';

/* eslint-disable camelcase */
angular.module('cs3200project').controller('cityController', ['$scope', '$routeParams', 'Data', function($scope, $routeParams, Data) {
  $scope.init = function() {
    $scope.activeImg = {};
    $scope.interestFilter = 'all';

    Data.getInterestTypes()
      .then(function(res) {
        $scope.interest_types = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    Data.getCity($routeParams.id)
      .then(function(res) {
        $scope.city = res.data[0];
      })
      .catch(function(err) {
        console.log(err);
      });
    Data.getCityImages($routeParams.id)
      .then(function(res) {
        $scope.cityImages = res.data;
        $scope.activeImg = $scope.cityImages[0];
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

    $scope.modalOpen = false;
    $scope.modalPlace = {};
  };

  $scope.filterByInterest = function(place) {
    return true;
  };

  $scope.setActiveImg = function(img) {
    $scope.activeImg = img;
  };

  $scope.createDate = function(date) {
    return new Date(date);
  };

  $scope.getNumber = function(num) {
    return new Array(num);
  };

  $scope.loadIntoModal = function(place) {
    $scope.modalOpen = true;
    $scope.modalPlace = place;
  };

  $scope.init();
}]);
