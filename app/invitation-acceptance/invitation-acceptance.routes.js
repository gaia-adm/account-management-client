export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('invitations', {
      abstract: true,
      views: {
        nav: {
          template: '<div nav></div>'
        },
        main: {
          template: '<ui-view class="invitations"/>'
        }
      }
    })
    .state('invitations.acceptance', {
      url: '/invitations/{uuid}',
      authRequired: false,
      template: require('./invitation-acceptance.html'),
      controller: 'InvitationAcceptanceController',
      controllerAs: 'invitationCtrl'
    });
}
