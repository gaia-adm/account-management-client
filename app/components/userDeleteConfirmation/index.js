"use strict";

import angular from 'angular';

function userDeleteConfirmation(UserResource) {
  'ngInject';
  return {
    restrict: 'A',
    replace: true,
    scope: {
      onConfirm: '&?',
      onCancel: '&?'
    },
    template: require('./userDeleteConfirmation.html'),
    controller: function($scope) {
      'ngInject';
      let emptyFn = function(){};
      if(typeof $scope.onConfirm != 'function') $scope.onConfirm = emptyFn;
      if(typeof $scope.onCancel != 'function') $scope.onCancel = emptyFn;

      $scope.deleteUser = function() {
        $scope.onConfirm();
      };

      $scope.cancel = function() {
        $scope.onCancel();
      };
    }
  }
}

export default angular.module('directives.userDeleteConfirmation', [])
  .directive('userDeleteConfirmation', userDeleteConfirmation)
  .name;
