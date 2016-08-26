"use strict";

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
import ErrorInterceptor from './services/error';
import GapiService from './services/gapi';
import InvitationResource from './services/invitations';
import UserResource from './services/users';

import routing from './app.routes';

import Login from './login';
import Home from './home';
import AccountsMain from './accounts-main';
import AccountsDetail from './accounts-detail';
import InvitationAcceptance from './invitation-acceptance';
import UsersDetail from './users-detail';
import UsersMain from './users-main';

import accountDeleteConfirmationDirective from './components/accountDeleteConfirmation';
import accountFormDirective from './components/accountForm';
import accountListDirective from './components/accountList';
import invitationListDirective from './components/invitationList';
import inviteUserDirective from './components/inviteUser';
import userDeleteConfirmationDirective from './components/userDeleteConfirmation';
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
  /*@ngInject*/
  constructor($transitions, $state, toastr, AuthUser) {

    let currentRoles = null;

    let requiresAuthCriteria = {
      to: (state) => !!state.authRequired
    };

    let requiresRoleCriteria = {
      to: function(state) {
        currentRoles = state.roles;
        return state.roles && state.roles.length > 0
      }
    };

    $transitions.onBefore( requiresAuthCriteria, function() {
      let user = AuthUser.get();
      if(user) {
        return true;
      } else {
        toastr.error('Not authorized', 'ERROR');
        $state.go('login');
      }
    });

    $transitions.onBefore(
      requiresRoleCriteria,
      function(transition, state) {
        let user = AuthUser.get();
        if(_.includes(currentRoles, 'superuser') && user.isSuperuser) {
          return true;
        } else if(_.includes(currentRoles, 'admin') && (user.isAdmin || user.isSuperuser)) {
          return true;
        } else if(_.includes(currentRoles, 'account-admin') && (user.isAccountAdmin || user.isAdmin || user.isSuperuser)) {
          return true;
        }
        toastr.error('You are not permitted to access that section.', 'ERROR');
        return false;
      }
    );
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
  InvitationAcceptance,
  UsersDetail,
  UsersMain,

  //services
  AccountResource,
  AuthServices,
  ErrorInterceptor,
  GapiService,
  InvitationResource,
  UserResource,

  //directive
  accountDeleteConfirmationDirective,
  accountFormDirective,
  accountListDirective,
  invitationListDirective,
  inviteUserDirective,
  userDeleteConfirmationDirective,
  userFormDirective,
  userListDirective,
  navDirective
])
  .config(routing)
  .constant("appConfig", {
    "url": ""
  })
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
