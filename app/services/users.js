"use strict";

const UserResource = function($resource, $http, $q, AuthUser, AccountResource, appConfig) {
  'ngInject';
  var UserResource = $resource(appConfig.url + '/api/users/:id');
  UserResource.login = function(id_token) {
    var deferred = $q.defer();
    $http({
      url: appConfig.url + '/auth/google/token',
      method: 'POST',
      withCredentials: true,
      data: {id_token: id_token}
    }).then(function(response) {
      if(response.data && response.data.user) {
        //SAVE THE TOKEN!
        let user = response.data.user;
        user.isAccountAdmin = false;

        //check for account admin access
        if(!user.isSuperuser && !user.isAdmin) {
          AccountResource.query(function(results) {
            user.isAccountAdmin = results.length > 0;
            AuthUser.set(user);
            return deferred.resolve(response.data);
          }, function() {
            console.error('could not get accounts');
            deferred.reject();
          })
        } else {
          AuthUser.set(user);
          return deferred.resolve(response.data);
        }
      } else {
        return deferred.reject();
      }
    }).catch(function(err) {
      var err = err.data || err;
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  return UserResource;
};

export default angular.module('services.user', [])
  .factory('UserResource', UserResource)
  .name;
