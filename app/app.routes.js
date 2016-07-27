export default function routing($locationProvider, $urlRouterProvider, $stateProvider, $resourceProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('login');

  $stateProvider.state('authenticated', {
    abstract: true,
    views: {
      nav: {
        template: '<div nav></div>'
      },
      main: {
        template: '<ui-view/>'
      }
    }
  });

  $resourceProvider.defaults.actions.update = {
    method: 'PUT'
  };
}
