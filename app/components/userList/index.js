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
      mode: '@',
      removeUser: '&?',
      deleteUser: '&?'
    },
    template: require('./userList.html'),
    controller: function($scope) {
      'ngInject';
      let emptyFn = function(){};
      if(typeof $scope.removeUser != 'function') $scope.removeUser = emptyFn;
      if(typeof $scope.deleteUser != 'function') $scope.deleteUser = emptyFn;
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
      };
      $scope.onRemoveUser = function(user) {
        $scope.removeUser({user: user});
      };
      $scope.onDeleteUser = function(user) {
        $scope.deleteUser({user: user});
      };
    }
  }
}

export default angular.module('directives.userList', [])
  .directive('userList', userList)
  .name;
