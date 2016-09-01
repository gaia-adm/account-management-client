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

      $scope.sort = function(field, direction) {
        $scope.users = _.sortBy($scope.users, field);
        if(direction === 'ASC') {
          _.reverse($scope.users);
        }
        $scope.currentSortField = field;
        $scope.currentSortDirection = direction;
        console.log($scope.currentSortField, $scope.currentSortDirection);
      };

      $scope.toggleSort = function(field) {
        if($scope.currentSortField !== field ||
          ($scope.currentSortField === field && $scope.currentSortDirection === 'ASC')) {
          $scope.sort(field, 'DESC');
        } else {
          $scope.sort(field, 'ASC');
        }
      };

      $scope.currentSortField = 'lastName';
      $scope.currentSortDirection = 'DESC';
    }
  }
}

export default angular.module('directives.userList', [])
  .directive('userList', userList)
  .name;
