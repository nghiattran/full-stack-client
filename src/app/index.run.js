export function runBlock ($log, request, $state, $rootScope) {
  'ngInject';
  $log.debug('runBlock end');

  if (!$rootScope.user) {
    request.getUser();
  }

  $rootScope.$on("$stateChangeStart",
    function(event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !request.getUser()) {
        $state.go("signin");
        event.preventDefault();
      }
    });
}
