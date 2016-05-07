export function packageRouterConfig ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('package', {
      url: '/package/:username/:pkgName',
      templateUrl: 'app/package/package.html',
      controller: 'PackageController',
      controllerAs: 'package',
      authenticate: false
    })
}