export function authRouterConfig ($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      authenticate: false
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      authenticate: false
    });
}
