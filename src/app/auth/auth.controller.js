'use strict';

export class AuthController {
  constructor (request, $cookies, $log) {
    'ngInject';
    this.API = request;
    this.$cookies = $cookies;
    this.$log = $log;
    this.$log.log('hi')
    var username = 'nghiattran5';
    var data = {
      username: username,
      password: 'nghiattran',
      email: username + '@email.com'
    }

    this.signin(data)
  }

  signup(user) {

    this.API.signup(user)
    .then(function (res) {
      // console.log(res);
      return res;
    })
    .catch(function (err) {
      return err;
    });
  }

  signin(user) {

    this.API.signin(user)
    .then(function (res) {
      // console.log(res);
      return res;
    })
    .catch(function (err) {
      return err;
    });
  }
}
