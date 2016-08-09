"use strict";

import angular from 'angular';
import _ from 'lodash';
import roles from '../../../config/roles';

import './user-list.css';

function userList() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      users: '=',
      mode: '@'
    },
    template: require('./userList.html'),
    controller: function($scope) {
      'ngInject';
      $scope.roles = roles;
      $scope.radio = {};
      $scope.onRoleChange = function(user) {
        //map the radio object to an array of allowed role ids
        user.role_ids = _.reduce(user.radio, function(result, value, key) {
          if(value === true) {
            result.push(Number(key));
          }
          return result;
        }, []);
      }
    }
  }
}

export default angular.module('directives.userList', [])
  .directive('userList', userList)
  .name;
