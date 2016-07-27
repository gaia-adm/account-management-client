let _toastr, _state;

export default class AccountsDetailController {

  constructor($stateParams, AccountResource, toastr, $state) {
    _toastr = toastr;
    _state = $state;
    let id = $stateParams.accountId;
    this.account = AccountResource.get({id: id});
    this.inviteUserModalConfig = {};
  }

  saveChanges(account) {
    if(account.users.length === 0) {
      delete(account.users);
    }
    account.$update().then(function(account) {
      _toastr.success('Account updated');
      _state.go('authenticated.accounts.main');
    }).catch(function(e) {
      _toastr.error(e);
    });
  }

  disableAccount(account) {
    if(account.users.length === 0) {
      delete(account.users);
    }

    account.enabled = false;
    account.$update().then(function(account) {
      _toastr.success('Account disabled.');
      _state.go('authenticated.accounts.main');
    }).catch(function(e) {
      _toastr.error(e);
    });
  }

  reenableAccount(account) {
    if(account.users.length === 0) {
      delete(account.users);
    }

    account.enabled = true;
    account.$update().then(function(account) {
      _toastr.success('Account reenabled.');
      _state.go('authenticated.accounts.main');
    }).catch(function(e) {
      _toastr.error(e);
    });
  }
}
