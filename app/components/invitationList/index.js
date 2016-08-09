"use strict";

import angular from 'angular';
import _ from 'lodash';
import roles from '../../../config/roles';

function invitationList(AccountResource) {
  'ngInject';
  return {
    restrict: 'A',
    replace: true,
    scope: {
      invitations: '='
    },
    template: require('./invitationList.html'),
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
      };
      $scope.getRoleNames = function(ids) {
        let roleNames = _.reduce(roles, function(result, value, key) {
          if(_.includes(ids, value.id)) {
            result.push(value.name);
          }
          return result;
        }, []);
        return roleNames.join(', ');
      };
      $scope.revokeInvitation = function(invitation) {
        AccountResource.revokeInvitation(invitation)
          .then(function() {
            _.pull($scope.invitations, invitation);
          })
          .catch(function(e) {
            console.error(e);
          });
      };
    }
  }
}

export default angular.module('directives.invitationList', [])
  .directive('invitationList', invitationList)
  .name;
