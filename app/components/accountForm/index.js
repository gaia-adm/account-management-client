"use strict";

import angular from 'angular';

function accountForm(AccountResource) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      onSuccess: '&?',
      onFailure: '&?',
      onCancel: '&?'
    },
    template: require('./accountForm.html'),
    controller: function($scope) {
      let emptyFn = function(){};
      if(typeof $scope.onSuccess != 'function') $scope.onSuccess = emptyFn;
      if(typeof $scope.onFailure != 'function') $scope.onFailure = emptyFn;
      if(typeof $scope.onCancel != 'function') $scope.onCancel = emptyFn;

      $scope.account = {
        name: null,
        description: null
      };

      $scope.createAccount = function(account) {
        account.enabled = true;
        AccountResource.save(account,
          function success(resource) {
            if(resource.enabled !== false) resource.enabled = true;
            $scope.onSuccess({account: resource});
          },
          function failure(e) {
            $scope.onFailure(e);
          });
      };

      $scope.cancel = function() {
        $scope.onCancel();
      };
    }
  }
}

export default angular.module('directives.accountForm', [])
  .directive('accountForm', ['AccountResource', accountForm])
  .name;
