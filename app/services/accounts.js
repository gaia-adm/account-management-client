"use strict";
const AccountResource = function($resource, $http, appConfig) {
  'ngInject';
  var AccountResource = $resource(appConfig.url + '/api/accounts/:id', {
    id: '@id'
  });
  AccountResource.invite = function(params) {
    let {id, email, role_ids} = params;
    return $http({
      method: 'POST',
      url: appConfig.url + '/api/accounts/'+Number(id)+'/invitations',
      data: {email, role_ids}
    });
  };
  AccountResource.revokeInvitation = function(params) {
    let {uuid} = params;
    return $http({
      method: 'DELETE',
      url: appConfig.url + '/api/invitations/'+uuid
    });
  };
  return AccountResource;
};

export default angular.module('services.account', [])
  .factory('AccountResource', AccountResource)
  .name;
