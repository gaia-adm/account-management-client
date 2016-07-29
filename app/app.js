import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';
import ngTouch from 'angular-touch';
import toastr from 'angular-toastr';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import checklistModel from 'checklist-model';

import AccountResource from './services/accounts';
import AuthServices from './services/auth';
import UserResource from './services/users';

import routing from './app.routes';

import Login from './login';
import Home from './home';
import AccountsMain from './accounts-main';
import AccountsDetail from './accounts-detail';
import UsersMain from './users-main';

import accountFormDirective from './components/accountForm';
import accountListDirective from './components/accountList';
import invitationListDirective from './components/invitationList';
import inviteUserDirective from './components/inviteUser';
import userFormDirective from './components/userForm';
import userListDirective from './components/userList';
import navDirective from './components/nav';

import 'bootstrap/dist/css/bootstrap.css';
import 'angular-toastr/dist/angular-toastr.css';
import '../style/app.css';

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
  //Angular
  ngAnimate,
  ngCookies,
  ngMessages,
  ngResource,
  ngTouch,

  //Vendor
  toastr,
  uiBootstrap,
  uiRouter,
  checklistModel,

  //Screens
  Login,
  Home,
  AccountsMain,
  AccountsDetail,
  UsersMain,

  //services
  AccountResource,
  AuthServices,
  UserResource,

  //directive
  accountFormDirective,
  accountListDirective,
  invitationListDirective,
  inviteUserDirective,
  userFormDirective,
  userListDirective,
  navDirective
])
  .config(routing)
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
