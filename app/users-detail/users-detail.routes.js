export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('authenticated.users.detail', {
      url: '/users/detail/{userId:int}',
      authRequired: true,
      roles: ['superuser'],
      template: require('./users-detail.html'),
      controller: 'UsersDetailController',
      controllerAs: 'userDetails'
    });
}
