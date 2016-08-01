export default function routes($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      views: {
        nav: {
          template: '<div></div>'
        },
        main: {
          template: require('./login.html'),
          controller: 'LoginController',
          controllerAs: 'login'
        }
      }
    });
}
routes.$inject = ['$stateProvider'];
