import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import toastr from 'angular-toastr';
import uiRouter from 'angular-ui-router';

import AccountResource from './services/accounts';
import AuthServices from './services/auth';
import UserResource from './services/users';

import routing from './app.routes';

import AccountList from './accountList';
import Home from './home';
import Login from './login';

import accountListDirective from './components/accountList';
import navDirective from './components/nav';

import '../style/app.css';
import 'angular-toastr/dist/angular-toastr.min.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor($transitions, $state, toastr, AuthUser) {

    let requiresAuthCriteria = {
      to: (state) => !!state.authRequired
    };

    $transitions.onBefore( requiresAuthCriteria, function(transition, state) {

      let user = AuthUser.get();
      if(user) {
        return true;
      } else {
        toastr.error('Not authorized', 'ERROR');
        $state.go('login');
      }
    });
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
  ngCookies,
  ngResource,
  toastr,
  uiRouter,

  //Screens
  AccountList,
  Home,
  Login,

  //services
  AccountResource,
  AuthServices,
  UserResource,

  //directive
  accountListDirective,
  navDirective
])
  .config(routing)
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
