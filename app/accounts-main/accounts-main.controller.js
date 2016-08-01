"use strict";

let _uibModal;

export default class AccountsMainController {
  constructor(AccountResource, $uibModal) {
    this.list = AccountResource.query();
    let _self = this;
    _uibModal = $uibModal;

    this.createAccountModalConfig = {
      backdrop: true,
      controller: function($scope, $uibModalInstance) {
        $scope.onAccountCreationCancelled = function() {
          $uibModalInstance.close();
          _self.onAccountCreationCancelled();
        };
        $scope.onAccountCreationSuccess = function(account) {
          console.info('on success', account);
          $uibModalInstance.close();
          _self.onAccountCreationSuccess(account);
        };
        $scope.onAccountCreationFailure = function() {
          $uibModalInstance.close();
          _self.onAccountCreationFailure();
        };
      },
      template: '<div account-form ' +
      'on-success="onAccountCreationSuccess(account)" ' +
      'on-failure="onAccountCreationFailure()" ' +
      'on-cancel="onAccountCreationCancelled()" ' +
      '/>'
    };
  }

  createAccount(account) {
    this.createAccountModalInstance = _uibModal.open(this.createAccountModalConfig);
  }

  onAccountCreationSuccess(account) {
    this.list.push(account);
  }


  onAccountCreationFailure() {
    console.log('account creation failure');
  }


  onAccountCreationCancelled() {
    console.log('account creation cancelled');
  }

}

AccountsMainController.$inject = ['AccountResource', '$uibModal'];
