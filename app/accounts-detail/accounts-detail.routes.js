export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('authenticated.accounts.detail', {
      url: '/accounts/detail/{accountId:int}',
      authRequired: true,
      roles: ['superuser', 'admin', 'account-admin'],
      template: require('./accounts-detail.html'),
      controller: 'AccountsDetailController',
      controllerAs: 'accountDetails'
    });
}
