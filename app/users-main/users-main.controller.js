"use strict";

let _uibModal;

export default class UsersMainController {
  constructor(UserResource, $uibModal) {
    this.list = UserResource.query();
    let _self = this;
    _uibModal = $uibModal;

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
        $scope.onUserCreationFailure = function() {
          $uibModalInstance.close();
          _self.onUserCreationFailure();
        };
      },
      template: '<div account-form ' +
      'on-success="onUserCreationSuccess(user)" ' +
      'on-failure="onUserCreationFailure()" ' +
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


  onUserCreationFailure() {
    console.log('user creation failure');
  }


  onUserCreationCancelled() {
    console.log('user creation cancelled');
  }

}
