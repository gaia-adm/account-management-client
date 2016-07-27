let _toastr, _state;

export default class AccountsDetailController {

  constructor($stateParams, AccountResource, toastr, $state) {
    _toastr = toastr;
    _state = $state;
    let id = $stateParams.accountId;
    this.account = AccountResource.get({id: id});
  }

  saveChanges(account) {
    console.log('account', account);
    if(account.users.length === 0) {
      delete(account.users);
    }
    account.$update().then(function(user) {
      _toastr.success('Account updated');
      _state.go('authenticated.accounts.main');
    }).catch(function(e) {
      _toastr.error(e);
    });
  }
}
