'use strict';

export class AuthController {
  constructor (request, $cookies, $log, $state) {
    'ngInject';
    this.request = request;
    this.$state = $state;
    this.$cookies = $cookies;
    this.$log = $log;
  }

  signup(user) {
    var self = this;
    this.request.signup(user)
      .then(function (res) {
        self.$state.go('home');
        return res;
      })
      .catch(function (err) {
        return err;
      });
  }

  signin(user) {
    var self = this;
    this.request.signin(user)
      .then(function (res) {
        self.$state.go('home');
        return res;
      })
      .catch(function (err) {
        return err;
      });
  }

  requestReset(user) {
    var self = this;
    this.request.requestReset(user)
      .then(function (res) {
        self.$state.go('home');
        return res;
      })
      .catch(function (err) {
        return err;
      });
  }

  logout() {
    this.request.logout();
    this.$state.go('home');
  }
}
