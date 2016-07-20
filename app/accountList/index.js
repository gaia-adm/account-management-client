import angular from 'angular';
import routing from './accountList.routes';
import AccountListController from './accountList.controller';

export default angular.module('app.accountList', [])
  .config(routing)
  .controller('AccountListController', AccountListController)
  .name;
