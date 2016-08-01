"use strict";
const AccountResource = function($resource, $http) {
  var AccountResource = $resource('http://localhost:3000/api/accounts/:id', {
    id: '@id'
  });
  AccountResource.invite = function(params) {
    let {id, email, role_ids} = params;
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/api/accounts/'+Number(id)+'/invitations',
      data: {email, role_ids}
    });
  };
  AccountResource.revokeInvitation = function(params) {
    let {uuid} = params;
    return $http({
      method: 'DELETE',
      url: 'http://localhost:3000/api/invitations/'+uuid
    });
  };
  return AccountResource;
};

export default angular.module('services.account', [])
  .factory('AccountResource', ['$resource', '$http', AccountResource])
  .name;
