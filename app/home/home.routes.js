export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('authenticated.home', {
      url: '/home',
      authRequired: true,
      template: require('./home.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    });
}
