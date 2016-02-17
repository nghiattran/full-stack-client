export function NavbarDirective($rootScope) {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
      creationDate: '='
    },
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: false
  };

  return directive;
}

class NavbarController {
  constructor ($rootScope, $state, moment, request) {
    'ngInject';

    this.relativeDate = moment(this.creationDate).fromNow();
    // this.user = $rootScope.user;
    this.$rootScope = $rootScope;
    this.API = request;
    this.$state = $state;
  }

  logout()
  {
    this.API.logout();
    this.$state.go('home');
  }
}
