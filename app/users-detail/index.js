import angular from 'angular';
import routing from './users-detail.routes';
import UsersDetailController from './users-detail.controller';

export default angular.module('app.users.detail', [])
  .config(routing)
  .controller('UsersDetailController', UsersDetailController)
  .name;
