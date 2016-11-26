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

  Data.createCity = function(city) {
    var defer = $q.defer();

    $http.post('/cities', JSON.stringify(city))
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

  Data.login = function(user) {
    var defer = $q.defer();

    $http.post('/login/' + user.admin_username + '/' + user.admin_password)
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  Data.saveCity = function(city) {
    var defer = $q.defer();

    $http.put('/cities/' + city.city_id, JSON.stringify(city))
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  Data.deletePlace = function(id) {
    var defer = $q.defer();

    $http.delete('/places/' + id)
      .then(function(res) {
        defer.resolve(res);
      })
      .catch(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  Data.deleteCity = function(id) {
    var defer = $q.defer();

    $http.delete('/cities/' + id)
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
