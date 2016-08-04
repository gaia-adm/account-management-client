"use strict";

import angular from 'angular';

function nav(AuthService, AuthUser) {
  'ngInject';
  return {
    restrict: 'A',
    replace: false,
    template: require('./nav.html'),
    controller: function($scope) {
      'ngInject';
      $scope.logout = function() {
        AuthService.logout();
      };

      $scope.user = AuthUser.get();
    }
  }
}

export default angular.module('directives.nav', [])
  .directive('nav', nav)
  .name;
