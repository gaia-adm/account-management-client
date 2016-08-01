"use strict";

let _toastr, _uibModal;

export default class UsersMainController {
  constructor(UserResource, $uibModal, toastr) {
    this.list = UserResource.query();
    let _self = this;
    _uibModal = $uibModal;
    _toastr   = toastr;

    this.createUserModalConfig = {
      backdrop: true,
      controller: function($scope, $uibModalInstance) {
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
    _toastr.error(error.message, 'Error');
  }


  onUserCreationCancelled() {
    console.log('user creation cancelled');
  }

}
UsersMainController.$inject = ['UserResource', '$uibModal', 'toastr'];
