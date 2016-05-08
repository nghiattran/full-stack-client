export function profileRouterConfig ($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('profile', {
      url: '/profile/:username',
      templateUrl: 'app/profile/profile.user.html',
      controller: 'ProfileController',
      controllerAs: 'profile',
      authenticate: false
    })
}
