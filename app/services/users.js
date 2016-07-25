"use strict";

const UserResource = function($resource, $http, $q, AuthUser) {
  var UserResource = $resource('http://localhost:3000/api/users/:id');
  UserResource.login = function(id_token) {
    return $http({
      url: 'http://localhost:3000/auth/google/token',
      method: 'POST',
      withCredentials: true,
      data: {id_token: id_token}
    }).then(function(response) {
      if(response.data && response.data.user) {
        //SAVE THE TOKEN!
        UserResource.get({id: 42});
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
