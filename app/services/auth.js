"use strict";

const AuthService = function($window, $q, $state, AuthToken) {
  this.logout = function() {
    let gapi = $window.gapi;
    if(gapi.auth2) {
      this.googleSignout(gapi.auth2.getAuthInstance());
    } else {
      gapi.load('auth2', function() {
        let instance = gapi.auth2.init();
        instance.then(function() {
          this.googleSignout(instance);
        });
      });
    }
  };

  this.googleSignout = function(authInstance) {
    authInstance.signOut().then(function () {
      console.log('User signed out.');
      AuthToken.invalidate();
      $state.go('login');
    });
  };
};

const AuthToken = function($cookies) {
  this.token = null;
  this.set = function(token) {
    this.token = token;
    $cookies.put('token', token);
  };
  this.get = function() {
    if(this.token !== null) {
      return this.token;
    }
    return $cookies.get('token');
  };
  this.invalidate = function() {
    $cookies.remove('token');
    this.token = null;
  }
};

const AuthRole = function($cookies) {
  this.role = null;
  this.set = function(role) {
    this.role = role;
    $cookies.put('role', role);
  };
  this.get = function() {
    if(this.role !== null) {
      return this.role;
    }
    return $cookies.get('role');
  };
  this.invalidate = function() {
    $cookies.remove('role');
    this.role = null;
  }
};

const AuthInterceptor = function(AuthToken) {
  return {
    'request': function(config) {
      var token = AuthToken.get();
      if (token) {
        config.headers['x-access-token'] = token;
      };
      return config;
    }
  };
};

export default angular.module('services.auth', [])
  .service('AuthService', AuthService)
  .service('AuthToken', AuthToken)
  .service('AuthRole', AuthRole)
  .factory('AuthInterceptor', AuthInterceptor)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .run(function($window) {

  })
  .name;





