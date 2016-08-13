import angular from 'angular';
import routing from './invitation-acceptance.routes';
import InvitationAcceptanceController from './invitation-acceptance.controller';

export default angular.module('app.invitation.acceptance', [])
  .config(routing)
  .controller('InvitationAcceptanceController', InvitationAcceptanceController)
  .name;
