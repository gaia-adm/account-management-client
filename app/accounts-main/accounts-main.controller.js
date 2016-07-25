export default class AccountsMainController {
  constructor(AccountResource) {
    this.list = AccountResource.query();
  }
}
