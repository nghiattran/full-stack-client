export function userRouterConfig ($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('reset-password', {
      url: '/reset-password/:id',
      templateUrl: 'app/user/reset-password.html',
      controller: 'UserController',
      controllerAs: 'user',
      authenticate: false
    })
    .state('forgot-password', {
      url: '/forgot-password',
      templateUrl: 'app/user/forgot-password.html',
      controller: 'UserController',
      controllerAs: 'user',
      authenticate: false
    }).state('setting', {
      url: '/setting',
      templateUrl: 'app/user/setting.html',
      controller: 'UserController',
      controllerAs: 'user',
      authenticate: true
    });
}
