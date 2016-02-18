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
  }

  requestReset(user) {
    var self = this;
    this.API.requestReset(user)
      .then(function (res) {
        self.$state.go('home');
      })
      .catch(function (err) {
        return err;
      });
  }

  updateUser(user) {
    var self = this;
    var url = 'api/user/'+self.$rootScope.user._id+'/setting';
    console.log(url);
    this.API.put(url,user)
      .then(function (res) {
        self.$state.go('home');
      })
      .catch(function (err) {
        return err;
      });
  }
}
