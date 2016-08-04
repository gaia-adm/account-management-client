"use strict";

const UserResource = function($resource, $http, $q, AuthUser, appConfig) {
  'ngInject';
  var UserResource = $resource(appConfig.url + '/api/users/:id');
  UserResource.login = function(id_token) {
    return $http({
      url: appConfig.url + '/auth/google/token',
      method: 'POST',
      withCredentials: true,
      data: {id_token: id_token}
    }).then(function(response) {
      if(response.data && response.data.user) {
        //SAVE THE TOKEN!
        AuthUser.set(response.data.user);
        return $q.resolve(response.data);
      } else {
        return $q.reject();
      }
    });
  };
  return UserResource;
};

export default angular.module('services.user', [])
  .factory('UserResource', UserResource)
  .name;
