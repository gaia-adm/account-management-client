"use strict";

//none of the angular google goodies are any good
const GapiService = function($window, $q, $httpParamSerializer) {
  'ngInject';

  this.deferred = null;

  this.getGoogleOauthUrl = function(uuid, email) {
    let url = "https://accounts.google.com/o/oauth2/auth?";
    let params = {
      scope: 'profile email',
      state: uuid || '',
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: 'code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      approval_prompt: null,
      include_granted_scopes: true,
      login_hint: email || ''
    };
    url += $httpParamSerializer(params);
    return url;
  };

  this.validateInvitation = function(invitationUuid, email) {
    let w = window.open(this.getGoogleOauthUrl(invitationUuid, email));
    if(this.deferred) {
      this.deferred.reject();
    }
    this.deferred = $q.defer();
    return this.deferred.promise;
  };

  this.validateInvitationResponse = function(response) {
    if(response.status === 200 || response.status === '200') {
      this.deferred.resolve(response);
    } else {
      this.deferred.reject(response);
    }
    this.deferred = null;
  }

};

export default angular.module('services.gapi', [])
  .service('GapiService', GapiService)
  .run(function($window, $rootScope, GapiService) {
    'ngInject';
    $window.validateInvitation = function(response) {
      $rootScope.$apply(function() {
        GapiService.validateInvitationResponse(response);
      });
    }
  })
  .name;

