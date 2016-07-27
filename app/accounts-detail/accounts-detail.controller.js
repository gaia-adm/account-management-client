let _toastr, _state;

export default class AccountsDetailController {

  constructor($stateParams, AccountResource) {
    let id = $stateParams.accountId;
    this.account = AccountResource.get({id: id});
  }

  saveChanges(account) {
    console.log('account', account);

  }
}
