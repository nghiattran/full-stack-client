export function reportRouterConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
    .state('report', {
      url: '/report',
      templateUrl: 'app/report/report.html',
      controller: 'ReportController',
      controllerAs: 'report'
    })
}
