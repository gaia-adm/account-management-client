export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('authenticated.accounts', {
      abstract: true,
      template: '<div class="accounts" ui-view />'
    })
    .state('authenticated.accounts.main', {
      url: '/accounts',
      authRequired: true,
      roles: ['superuser', 'admin', 'account-admin'],
      template: require('./accounts-main.html'),
      controller: 'AccountsMainController',
      controllerAs: 'accounts'
    });
}
