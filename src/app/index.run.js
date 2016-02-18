export function runBlock ($log, request, $state, $rootScope) {
  'ngInject';
  $log.debug('runBlock end');

  if (!$rootScope.user) {
    request.setUser();
  };

  $rootScope.$on("$stateChangeStart",
    function(event, toState, toParams, fromState, fromParams) {
      console.log(toState.authenticate)
      console.log(request.getUser())
      if (toState.authenticate && !request.getUser()) {
        $state.go("signin");
        event.preventDefault();
      }
    });
}
