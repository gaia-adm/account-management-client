export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('authenticated.users', {
      abstract: true,
      template: '<div class="users" ui-view />'
    })
    .state('authenticated.users.main', {
      url: '/users',
      authRequired: true,
      roles: ['superuser'],
      template: require('./users-main.html'),
      controller: 'UsersMainController',
      controllerAs: 'users'
    });
}
