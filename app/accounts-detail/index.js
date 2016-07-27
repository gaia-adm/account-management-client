import angular from 'angular';
import routing from './accounts-detail.routes';
import AccountsDetailController from './accounts-detail.controller';

export default angular.module('app.accounts.detail', [])
  .config(routing)
  .controller('AccountsDetailController', AccountsDetailController)
  .name;
