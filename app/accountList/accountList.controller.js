export default class AccountListController {
  constructor(AccountResource) {
    this.list = AccountResource.query();
  }
}
