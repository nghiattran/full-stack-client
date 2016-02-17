export function runBlock ($log, request) {
  'ngInject';
  request.setUser();
  $log.debug('runBlock end');
}
