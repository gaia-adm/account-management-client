export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      authRequired: true,
      views: {
        nav: {
          template: '<div nav></div>'
        },
        main: {
          template: require('./home.html'),
          controller: 'HomeController',
          controllerAs: 'home'
        }
      }
    });
}
