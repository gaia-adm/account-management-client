"use strict";
const ErrorInterceptor = function($q, $injector) {
  'ngInject';
  return {
    'responseError': function (rejection) {
      //toastr must be injected within this closure or it's a circular dependency
      let toastr = $injector.get('toastr');
      if(rejection && rejection.data) {
        toastr.error(rejection.data.message, rejection.data.name);
      }
      return $q.reject(rejection);
    }
  };
};
export default angular.module('services.error', [])
  .factory('ErrorInterceptor', ErrorInterceptor)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('ErrorInterceptor');
  })
  .name;
