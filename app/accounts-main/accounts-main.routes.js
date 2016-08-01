export default function routes($stateProvider) {
  $stateProvider
    .state('authenticated.accounts', {
      abstract: true,
      template: '<div class="accounts" ui-view />'
    })
    .state('authenticated.accounts.main', {
      url: '/accounts',
      authRequired: true,
      template: require('./accounts-main.html'),
      controller: 'AccountsMainController',
      controllerAs: 'accounts'
    });
}

routes.$inject = ['$stateProvider'];
