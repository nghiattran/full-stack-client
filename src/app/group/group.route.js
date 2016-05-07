export function groupRouterConfig ($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('groups', {
      url: '/groups',
      abstract: true,
      templateUrl: 'app/group/groups.html',
      controller: 'GroupController',
      controllerAs: 'group',
      authenticate: false
    })
    .state('groups.add', {
      url: '/new',
      templateUrl: 'app/group/groups.add.html'
    })
    .state('groups.group', {
      url: '/:groupName',
      templateUrl: 'app/group/groups.group.html'
    })
    .state('groups.group.packages', {
      url: '/packages',
      templateUrl: 'app/group/groups.group.packages.html'
    })
    .state('groups.group.setting', {
      url: '/setting',
      templateUrl: 'app/group/groups.group.setting.html'
    })
}
