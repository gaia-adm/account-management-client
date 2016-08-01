"use strict";

import angular from 'angular';
import _ from 'lodash';

function accountList($q) {
  'ngInject';
  return {
    restrict: 'A',
    replace: true,
    scope: {
      accounts: '='
    },
    template: require('./accountList.html'),
    controller: function($scope) {
      'ngInject';
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
    }
  }
}

export default angular.module('directives.accountList', [])
  .directive('accountList', accountList)
  .name;
