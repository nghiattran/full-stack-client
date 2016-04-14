'use strict'

export class AuthController {
  constructor (request, $cookies, $log, $state, $http) {
    'ngInject'
    this.request = request
    this.$state = $state
    this.$cookies = $cookies
    this.$log = $log
  }

  fire() {
    // $http.get("")
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      function(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile()
        console.log("ID: " + profile.getId()) // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName())
        console.log('Given Name: ' + profile.getGivenName())
        console.log('Family Name: ' + profile.getFamilyName())
        console.log("Image URL: " + profile.getImageUrl())
        console.log("Email: " + profile.getEmail())

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token
        console.log("ID Token: " + id_token)
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2))
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
      self.attachSignin(document.getElementById('google-auth-btn'))
    })
  }

  signup(user) {
    var self = this
    this.request.signup(user)
    .then(function (res) {
      self.$state.go('home')
      return res
    })
    .catch(function (err) {
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
