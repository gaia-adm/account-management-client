"use strict";

import angular from 'angular';

function nav(AuthService) {
  return {
    restrict: 'A',
    replace: false,
    template: require('./nav.html'),
    link: function($scope) {
      $scope.logout = function() {
        console.info(AuthService.logout());
      }
    }
  }
}

export default angular.module('directives.nav', [])
  .directive('nav', nav)
  .name;
