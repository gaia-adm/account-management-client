"use strict";

import angular from 'angular';
import './user-form.css';

function userForm(UserResource, toastr) {
  'ngInject';
  return {
    restrict: 'A',
    replace: true,
    scope: {
      onSuccess: '&?',
      onFailure: '&?',
      onCancel: '&?',
      user: '=?',
      mode: '@?'
    },
    template: require('./userForm.html'),
    controller: function($scope) {
      'ngInject';
      let emptyFn = function () {
      };
      if (typeof $scope.onSuccess != 'function') $scope.onSuccess = emptyFn;
      if (typeof $scope.onFailure != 'function') $scope.onFailure = emptyFn;
      if (typeof $scope.onCancel != 'function') $scope.onCancel = emptyFn;

      if (!$scope.user) {
        $scope.user = {
          firstName : null,
          lastName  : null,
          emailField: null,
          emails    : []
        };
      }

      $scope.userEmailsToArray = function(emailFieldValue) {
        let emails = emailFieldValue.split(/[^@a-zA-Z0-9!#$%&\*\+\-\/\=\?\^_`{|}~'.]+/);
        _.filter(emails, function(email) {
          return email.length > 0
        });
        return emails;
      };

      $scope.emailArrayToField = function(emails) {
        return emails.join(', ');
      };

      $scope.createUser = function(user) {
        user.emails = $scope.userEmailsToArray(user.emailField);
        UserResource.save(user,
          function success(resource) {
            $scope.onSuccess({user: resource});
          },
          function failure(response) {
            $scope.onFailure({error: response.data});
          });
      };

      $scope.saveUser = function(user) {
        user.emails = $scope.userEmailsToArray(user.emailField);

        user.$update().then(
          function success(resource) {
            toastr.success('User successfully updated.');
            resource.emailField = $scope.emailArrayToField(resource.emails);
            $scope.onSuccess({user: resource});
          }
        ).catch(
          function failure(response) {
            toastr.error('User update failed.');
            $scope.onFailure({error: response.data});
          }
        );
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
