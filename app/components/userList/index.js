"use strict";

import angular from 'angular';
import roles from '../../../../config/roles';

function userList() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      users: '='
    },
    template: require('./userList.html'),
    controller: function($scope) {
      console.info('roles', roles);
      $scope.roles = roles;
    }
  }
}

export default angular.module('directives.userList', [])
  .directive('userList', userList)
  .name;
