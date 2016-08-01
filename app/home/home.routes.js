export default function routes($stateProvider) {
  $stateProvider
    .state('authenticated.home', {
      url: '/home',
      authRequired: true,
      template: require('./home.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    });
}
routes.$inject = ['$stateProvider'];
