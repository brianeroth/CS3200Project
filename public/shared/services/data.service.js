'use strict';

angular.module('cs3200project').service('Data', ['$http', '$q', function($http, $q) {
  var Data = this;

  Data.getCities = function() {
    var defer = $q.defer();

    $http.get('/cities')
      .success(function(res) {
        defer.resolve(res);
      })
      .error(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  Data.getCity = function(id) {
    var defer = $q.defer();

    $http.get('/cities/' + id)
      .success(function(res) {
        defer.resolve(res);
      })
      .error(function(err) {
        defer.reject(err);
      });

    return defer.promise;
  };

  return Data;
}]);
