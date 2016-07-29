import angular from 'angular';
import routing from './users-main.routes';
import UsersMainController from './users-main.controller';

export default angular.module('app.users.main', [])
  .config(routing)
  .controller('UsersMainController', UsersMainController)
  .name;
