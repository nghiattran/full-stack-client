'use strict';

export class UserController {
  constructor (request, $cookies, $log, $state, $rootScope, jwtHelper) {
    'ngInject';
    this.API = request;
    this.$state = $state;
    this.$cookies = $cookies;
    this.$log = $log;
    this.jwtHelper = jwtHelper;
    this.$rootScope = $rootScope;

    // console.log(request.getToken())
    request.setUser();
    console.log($rootScope.user.username)
  }

  requestReset(user) {
    var that = this;
    this.API.requestReset(user)
      .then(function (res) {
        that.$state.go('home');
      })
      .catch(function (err) {
        return err;
      });
  }
}
