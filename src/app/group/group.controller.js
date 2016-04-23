'use strict'

export class GroupController {
  constructor (request, $cookies, $log, $state) {
    'ngInject'
    this.request = request;
    this.$state = $state;
    this.$cookies = $cookies;
    this.$log = $log;
  }

  create(tmpGroup) {
    console.log(tmpGroup);
    var url = 'group';
    this.request.post(url,tmpGroup)
      .then(function (res) {
        console.log(res);
        return res;
      })
      .catch(function (err) {
        console.log('err',err);
        return err;
      });
  }
}