"use strict";

import angular from 'angular';
import _ from 'lodash';
import roles from '../../../../config/roles';

function inviteUser(AccountResource) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      accountId: '@',
      onSuccess: '&?',
      onFailure: '&?',
      onCancel: '&?'
    },
    template: require('./inviteUser.html'),
    controller: function($scope) {
      let emptyFn = function(){};
      if(typeof $scope.onSuccess != 'function') $scope.onSuccess = emptyFn;
      if(typeof $scope.onFailure != 'function') $scope.onFailure = emptyFn;
      if(typeof $scope.onCancel != 'function') $scope.onCancel = emptyFn;

      $scope.roles = roles;

      $scope.invitation = {
        email: null,
        role_ids: [],
        id: $scope.accountId,
      };

<<<<<<< Updated upstream
      $scope.sendInvite = function() {
        console.log('submit', $scope.invitation);

=======
<<<<<<< Updated upstream
      $scope.$watch('accounts', function(accounts) {
        $q.when(accounts.$promise, function() {
          $scope.filteredAccounts = _applyFilters(accounts);
        });
      });
=======
      $scope.sendInvite = function() {
>>>>>>> Stashed changes
        AccountResource.invite($scope.invitation)
          .then(function success(result) {
            console.info('result', result.data);
            $scope.onSuccess({invitation: result.data});
          })
          .catch(function failure(e) {
            $scope.onFailure(e);
          })
      };
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes

      $scope.cancel = function() {
        $scope.onCancel();
      };
    }
  }
}

export default angular.module('directives.inviteUser', [])
  .directive('inviteUser', inviteUser)
  .name;
