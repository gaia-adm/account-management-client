"use strict";

import angular from 'angular';
import _ from 'lodash';

function accountList($q) {
  'ngInject';
  return {
    restrict: 'A',
    replace: true,
    scope: {
      accounts: '=',
      deleteAccount: '&?'
    },
    template: require('./accountList.html'),
    controller: function($scope) {
      'ngInject';
      let emptyFn = function(){};
      if(typeof $scope.deleteAccount != 'function') $scope.deleteAccount = emptyFn;

      let _applyFilters = function(accounts) {
        if($scope.showDisabled) return accounts;
        return _.filter(accounts, {enabled: true});
      };

      $scope.$watchCollection('accounts', function(accounts) {
        $q.when(accounts.$promise, function() {
          $scope.filteredAccounts = _applyFilters(accounts);
        });
      });

      $scope.toggleShowDisabled = function() {
        $scope.showDisabled = !$scope.showDisabled;
        $scope.filteredAccounts = _applyFilters($scope.accounts);
      };

      $scope.onDeleteAccount = function(account) {
        $scope.deleteAccount({account: account});
      };
    }
  }
}

export default angular.module('directives.accountList', [])
  .directive('accountList', accountList)
  .name;
