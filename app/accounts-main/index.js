import angular from 'angular';
import routing from './accounts-main.routes';
import AccountsMainController from './accounts-main.controller';

export default angular.module('app.accounts.main', [])
  .config(routing)
  .controller('AccountsMainController', AccountsMainController)
  .name;
