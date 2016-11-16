'use strict';

angular.module('cs3200project').controller('createController', ['$scope', '$location', 'Data', function($scope, $location, Data) {
  $scope.init = function() {
    $scope.newUser = {
        admin_name: null,
        admin_username: null,
        admin_password: null,
        admin_confirmPassword: null
    }
  };

  $scope.createAccount = function() {
    $scope.errorMessage = '';
    if (!$scope.newUser.admin_name) {
        $scope.errorMessage = 'Your name is required.';
    } else if (!$scope.newUser.admin_username) {
        $scope.errorMessage = 'A username is required.';
    } else if (!$scope.newUser.admin_password) {
        $scope.errorMessage = 'Please enter a password.';
    } else if (!$scope.newUser.admin_confirmPassword || $scope.newUser.admin_password != $scope.newUser.admin_confirmPassword) {
        $scope.errorMessage = 'Your passwords do not match.';
    } else {
        Data.createAccount($scope.newUser)
          .then(function(res) {
            $location.path('/login');
          })
          .catch(function(err) {

          });
    }
  }

  $scope.init();
}]);
