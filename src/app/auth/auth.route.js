export function authRouterConfig ($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .state('reset-password', {
      url: '/reset-password',
      templateUrl: 'app/auth/reset-password.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    });
}
