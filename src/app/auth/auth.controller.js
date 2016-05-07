'use strict'

export class AuthController {
  constructor (request, $cookies, $log, $state, $http, $window) {
    'ngInject'
    this.request = request;
    this.$state = $state;
    this.$cookies = $cookies;
    this.$log = $log;
    this.$window = $window;
    this.user = null;
  }

  attachSignup(element) {
    var self = this;
    this.auth2.attachClickHandler(element, {},
      function(googleUser) {
        var profile = googleUser.getBasicProfile()
        const user = {
          email: profile.getEmail(),
          username: profile.getEmail().substring(0, profile.getEmail().indexOf("@")),
          nickname: profile.getName(),
          provider: 'google',
          password: profile.getId()
        }
        self.signup(user);
      })
  }

  attachSignin(element) {
    var self = this;
    this.auth2.attachClickHandler(element, {},
      function(googleUser) {
        var profile = googleUser.getBasicProfile()
        const user = {
          email: profile.getEmail(),
          username: profile.getEmail().substring(0, profile.getEmail().indexOf("@")),
          password: profile.getId()
        }
        console.log(user);
        self.signin(user);
      })
  }

  startAppin() {
    const self = this

    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      self.auth2 = gapi.auth2.init({
        client_id: '46924371642-1to9hh7tsvves6srmmmalrs8mcdrf1de.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      })
      self.attachSignin(document.getElementById('google-auth-btn-in'))
    })
  }


  startApp() {
    const self = this

    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      self.auth2 = gapi.auth2.init({
        client_id: '46924371642-1to9hh7tsvves6srmmmalrs8mcdrf1de.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      })
      self.attachSignup(document.getElementById('google-auth-btn'))
    })
  }

  signup(user) {
    var self = this;
    this.request.signup(user)
    .then(function (res) {
      self.$state.go('home');
      return res
    })
    .catch(function (err) {
      console.log(err);
      return err
    })
  }

  signin(user) {
    var self = this
    this.request.signin(user)
    .then(function (res) {
      self.$state.go('home')
      return res
    })
    .catch(function (err) {
      return err
    })
  }

  requestReset(user) {
    var self = this
    this.request.requestReset(user)
    .then(function (res) {
      self.$state.go('home')
      return res
    })
    .catch(function (err) {
      return err
    })
  }

  logout() {
    this.request.logout()
    this.$state.go('home')
  }


}
