'use strict';

/* eslint-disable camelcase */
/* eslint-disable no-negated-condition */
angular.module('cs3200project').controller('loginController', ['$scope', 'Data', '$location', function($scope, Data, $location) {
  $scope.init = function() {
    $scope.user = {
      admin_username: null,
      admin_password: null
    };
  };

  $scope.login = function() {
    $scope.errorMessage = '';
    if (!$scope.user.admin_username) {
      $scope.errorMessage = 'A username is required.';
    } else if (!$scope.user.admin_password) {
      $scope.errorMessage = 'A password is required.';
    } else {
      Data.login($scope.user)
          .then(function(res) {
            if (!res.data.length) {
              $scope.errorMessage = 'Incorrect username and/or password. Try again.';
            } else {
              $location.path('/admin');
            }
          })
          .catch(function(err) {
            $scope.errorMessage = 'Incorrect username and/or password. Try again.';
          });
    }
  };

  $scope.init();
}]);
