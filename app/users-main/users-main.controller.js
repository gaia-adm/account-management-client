"use strict";

let _toastr, _uibModal;

export default class UsersMainController {
  /*@ngInject*/
  constructor(UserResource, $uibModal, toastr) {
    this.list = UserResource.query();
    let _self = this;
    _uibModal = $uibModal;
    _toastr   = toastr;

    this.createUserModalConfig = {
      backdrop: true,
      controller: function($scope, $uibModalInstance) {
        'ngInject';
        $scope.onUserCreationCancelled = function() {
          $uibModalInstance.close();
          _self.onUserCreationCancelled();
        };
        $scope.onUserCreationSuccess = function(user) {
          console.info('on success', user);
          $uibModalInstance.close();
          _self.onUserCreationSuccess(user);
        };
        $scope.onUserCreationFailure = function(error) {
          _self.onUserCreationFailure(error);
        };
      },
      template: '<div user-form ' +
      'on-success="onUserCreationSuccess(user)" ' +
      'on-failure="onUserCreationFailure(error)" ' +
      'on-cancel="onUserCreationCancelled()" ' +
      '/>'
    };
  }

  createUser(user) {
    this.createUserModalInstance = _uibModal.open(this.createUserModalConfig);
  }

  onUserCreationSuccess(user) {
    this.list.push(user);
  }


  onUserCreationFailure(error) {
    console.log('user creation failure', error);
  }


  onUserCreationCancelled() {
    console.log('user creation cancelled');
  }

}
