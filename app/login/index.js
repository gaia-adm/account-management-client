import angular from 'angular';
import routing from './login.routes';
import LoginController from './login.controller';

export default angular.module('app.login', [])
  .config(routing)
  .controller('LoginController', LoginController)
  .name;
