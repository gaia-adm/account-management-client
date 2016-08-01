"use strict";

import angular from 'angular';

function userForm(UserResource) {
  'ngInject';
  return {
    restrict: 'A',
    replace: true,
    scope: {
      onSuccess: '&?',
      onFailure: '&?',
      onCancel: '&?'
    },
    template: require('./userForm.html'),
    controller: function($scope) {
      'ngInject';
      let emptyFn = function(){};
      if(typeof $scope.onSuccess != 'function') $scope.onSuccess = emptyFn;
      if(typeof $scope.onFailure != 'function') $scope.onFailure = emptyFn;
      if(typeof $scope.onCancel != 'function') $scope.onCancel = emptyFn;

      $scope.user = {
        firstName: null,
        lastName: null,
        emailField: null,
        emails: []
      };

      $scope.createUser = function(user) {
        user.emails = user.emailField.split(/[^@a-zA-Z0-9!#$%&*+-\/=?^_`{|}~']/);
        UserResource.save(user,
          function success(resource) {
            $scope.onSuccess({user: resource});
          },
          function failure(response) {
            $scope.onFailure({error: response.data});
          });
      };

      $scope.cancel = function() {
        $scope.onCancel();
      };
    }
  }
}

export default angular.module('directives.userForm', [])
  .directive('userForm', userForm)
  .name;
