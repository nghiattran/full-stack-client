export function runBlock ($log, request, $state, $rootScope, $stateParams) {
  'ngInject';
  $log.debug('runBlock end');

  if (!$rootScope.user) {
    $log.debug('here');
    request.getUser();
  }

  $rootScope.$watchCollection(function(){
    return $stateParams;
  }, function(){
    $log.info("State params have been updated", $stateParams);
  })
}
