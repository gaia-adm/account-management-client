"use strict";

const AuthService = function($window, $q, $state, AuthUser) {
  'ngInject';
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
      AuthUser.invalidate();
      $state.go('login');
    });
  };
};

const AuthUser = function($cookies) {
  'ngInject';
  this.data = null;
  this.set = function(data) {
    this.data = data;
    $cookies.put('user', JSON.stringify(data));
  };
  this.get = function() {
    if(this.data !== null) {
      return this.data;
    }
    let userCookie = $cookies.get('user');
    if(userCookie) {
      this.data = JSON.parse(userCookie);
      return this.data;
    }
    return null;
  };
  this.invalidate = function() {
    $cookies.remove('user');
    this.data = null;
  }
};

const AuthRole = function($cookies) {
  'ngInject';
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

// const AuthInterceptor = function(AuthToken) {
//   return {
//     'request': function(config) {
      // var token = AuthToken.get();
      // if (token) {
      //   config.headers['x-access-token'] = token;
      // };
      // return config;
      // config.headers['with-credentials'] = true;
      // return config;
    // }
  // };
// };

export default angular.module('services.auth', [])
  .service('AuthService', AuthService)
  .service('AuthUser', AuthUser)
  .service('AuthRole', AuthRole)
  // .factory('AuthInterceptor', AuthInterceptor)
  .config(['$httpProvider', function($httpProvider) {
    'ngInject';
    $httpProvider.defaults.withCredentials = true;
    // $httpProvider.interceptors.push('AuthInterceptor');
  }])
  .run(['$window', function($window) {
    'ngInject';

  }])
  .name;





