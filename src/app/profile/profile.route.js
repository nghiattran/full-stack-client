export function profileRouterConfig ($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('profile', {
      url: '/:username',
      templateUrl: 'app/profile/profile.user.html',
      controller: 'ProfileController',
      controllerAs: 'profile',
      authenticate: false
    })
}
