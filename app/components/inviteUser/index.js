"use strict";

import angular from 'angular';
import _ from 'lodash';

function inviteUser($q) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      accounts: '='
    },
    template: require('./inviteUser.html'),
    controller: function($scope) {
      let _applyFilters = function(accounts) {
        if($scope.showDisabled) return accounts;
        return _.filter(accounts, {enabled: true});
      };

      $scope.$watch('accounts', function(accounts) {
        $q.when(accounts.$promise, function() {
          $scope.filteredAccounts = _applyFilters(accounts);
        });
      });

      $scope.toggleShowDisabled = function() {
        $scope.showDisabled = !$scope.showDisabled;
        $scope.filteredAccounts = _applyFilters($scope.accounts);
      };
    }
  }
}

export default angular.module('directives.inviteUser', [])
  .directive('inviteUser', inviteUser)
  .name;
