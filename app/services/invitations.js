"use strict";
const InvitationResource = function($resource, $http, GapiService, appConfig) {
  'ngInject';
  var InvitationResource = $resource(appConfig.url + '/api/invitations/:uuid', {
    uuid: '@uuid'
  });

  InvitationResource.prototype.$validate = function() {
    return GapiService.validateInvitation(this.uuid, this.email);
  };

  return InvitationResource;
};

export default angular.module('services.invitations', [])
  .factory('InvitationResource', InvitationResource)
  .name;
