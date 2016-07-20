export default function routes($stateProvider) {
  $stateProvider
    .state('accountList', {
      url: '/accounts',
      template: require('./accountList.html'),
      controller: 'AccountListController',
      controllerAs: 'accounts'
    });
}
