"use strict";

let _uibModal, _toastr, user;

export default class AccountsMainController {
  /*@ngInject*/
  constructor(AccountResource, AuthUser, toastr, $uibModal) {
    this.list = AccountResource.query();
    let _self = this;
    _uibModal = $uibModal;
    _toastr = toastr;
    user = AuthUser.get();

    this.createAccountModalConfig = {
      backdrop: true,
      controller: function($scope, $uibModalInstance) {
        'ngInject';
        $scope.onAccountCreationCancelled = function() {
          $uibModalInstance.close();
          _self.onAccountCreationCancelled();
        };
        $scope.onAccountCreationSuccess = function(account) {
          console.info('on success', account);
          $uibModalInstance.close();
          _self.onAccountCreationSuccess(account);
        };
        $scope.onAccountCreationFailure = function(error) {
          console.info('on err', error);
          $uibModalInstance.close();
          _self.onAccountCreationFailure(error);
        };
      },
      template: '<div account-form ' +
      'on-success="onAccountCreationSuccess(account)" ' +
      'on-failure="onAccountCreationFailure(error)" ' +
      'on-cancel="onAccountCreationCancelled()" ' +
      '/>'
    };
  }

  createAccount(account) {
    this.createAccountModalInstance = _uibModal.open(this.createAccountModalConfig);
  }

  userCanCreate() {
    return user.isSuperuser || user.isAdmin;
  }

  onAccountCreationSuccess(account) {
    this.list.push(account);
  }


  onAccountCreationFailure(error) {
    _toastr.error(error.data.message, error.data.name);
  }


  onAccountCreationCancelled() {
    console.log('account creation cancelled');
  }

}
