'use strict';

export class AuthController {
  constructor (request, $cookies, $log, $state, $scope, $rootScope) {
    'ngInject';
    this.API = request;
    this.$state = $state;
    this.$cookies = $cookies;
    this.$log = $log;
  }

  signup(user) {
    var that = this;
    this.API.signup(user)
      .then(function (res) {
        that.$state.go('home');
      })
      .catch(function (err) {
        return err;
      });
  }

  signin(user) {
    var that = this;
    this.API.signin(user)
      .then(function (res) {
        that.$state.go('home');
      })
      .catch(function (err) {
        return err;
      });
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

  logout() {
    console.log('here')
    this.API.logout();
    this.$state.go('home');
  }
}
