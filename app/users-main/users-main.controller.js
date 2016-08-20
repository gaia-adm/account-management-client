"use strict";

let _toastr, _uibModal, _scope;

export default class UsersMainController {
  /*@ngInject*/
  constructor($scope, UserResource, $uibModal, toastr) {
    this.list = UserResource.query();
    let _self = this;
    _uibModal = $uibModal;
    _toastr   = toastr;
    _scope    = $scope;

    this.createUserModalConfig = {
      backdrop: true,
      controller: function($scope, $uibModalInstance) {
        'ngInject';
        $scope.onUserCreationCancelled = function() {
          $uibModalInstance.close();
          _self.onUserCreationCancelled();
        };
        $scope.onUserCreationSuccess = function(user) {
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

    this.deleteUserModalConfig = {
      backdrop: true,
      controller: function($scope, $uibModalInstance) {
        'ngInject';
        $scope.onUserDeletionCancelled = function() {
          $uibModalInstance.close();
          _self.onUserDeletionCancelled();
        };
        $scope.onUserDeletionConfirmed = function(user) {
          $uibModalInstance.close();
          _self.onUserDeletionConfirmed(user);
        };
      },
      template: '<div user-delete-confirmation ' +
      'on-confirm="onUserDeletionConfirmed()" ' +
      'on-cancel="onUserDeletionCancelled()" ' +
      '/>'
    };
  }

  createUser(user) {
    this.createUserModalInstance = _uibModal.open(this.createUserModalConfig);
  }

  deleteUser(user) {
    this.userToDelete = user;
    let modal = _uibModal.open(this.deleteUserModalConfig);
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

  onUserDeletionConfirmed() {
    let _self = this;
    if(_self.userToDelete) {
      _self.userToDelete.$delete(
        function success(resource) {
            _.remove(_self.list, function(user) {
              return user.id === _self.userToDelete.id;
            });
          _self.userToDelete = null;
          _toastr.success('User Deleted');

        }
      );
    }
  }

  onUserDeletionCancelled() {
    console.log('user deletion cancelled');
  }

}
