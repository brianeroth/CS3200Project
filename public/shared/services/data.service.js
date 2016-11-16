'use strict';

angular.module('cs3200project').service('Data', ['$http', '$q', function($http, $q) {
  var Data = this;

  Data.getCities = function() {
    var defer = $q.defer();

    $http.get('/cities')
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  Data.getCity = function(id) {
    var defer = $q.defer();

    $http.get('/cities/' + id)
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  Data.getCityImages = function(id) {
    var defer = $q.defer();

    $http.get('/cityImages/city/' + id)
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  Data.getAllCityImages = function(id) {
    var defer = $q.defer();

    $http.get('/cityImages')
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  Data.getPlacesInCity = function(id, type) {
    var defer = $q.defer();

    $http.get('/places/city/' + id + '?type=' + type)
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  Data.createAccount = function(newUser) {
    var defer = $q.defer();

    $http.post('/accounts', JSON.stringify(newUser))
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  return Data;
}]);
