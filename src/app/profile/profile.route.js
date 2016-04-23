export function profileRouterConfig ($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/profile/profile.html',
      controller: 'AuthController',
      controllerAs: 'profile',
      authenticate: false
    })
}
