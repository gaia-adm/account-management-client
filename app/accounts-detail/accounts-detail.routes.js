
export default function routes($stateProvider) {
  $stateProvider
    .state('authenticated.accounts.detail', {
      url: '/accounts/detail/{accountId:int}',
      authRequired: true,
      template: require('./accounts-detail.html'),
      controller: 'AccountsDetailController',
      controllerAs: 'accountDetails'
    });
}

routes.$inject = ['$stateProvider'];
