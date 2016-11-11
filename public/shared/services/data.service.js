'use strict';

angular.module('cs3200project').service('Data', ['$http', '$q', function($http, $q) {
  var Data = this;
  Data.viibes = {};

  Data.updateProfilePicture = function(picture) {
    var defer = $q.defer();

    $http.get('')
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
