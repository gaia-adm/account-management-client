import angular from 'angular';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';

import AccountResource from './services/accounts';
import UserResource from './services/users';

import AccountList from './accountList';

import accountListDirective from './components/accountList';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor(AccountResource) {
    // var a = new AccountResource();
    // a.$save();
    AccountResource.query();
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
  ngResource,
  uiRouter,

  //Screens
  AccountList,

  //services
  AccountResource,
  UserResource,

  //directive
  accountListDirective
])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
