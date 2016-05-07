'use strict'

export class ProfileController {
  constructor ($timeout, $rootScope, $state, $sanitize, $sce, $scope, $http, request) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$state = $state;
    this.request = request;
    this.$sanitize = $sanitize;
    this.$http = $http;
  }

  getAvatar(name) {
    console.log('http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Users&column=name&id=' + name);
    this.$http.get('http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Users&column=name&id=' + name)
      .then(function (res) {
        if (res.data) {
          document.getElementById("avatar").src = "data:image/png;base64, " + res.data;
        } else {
          document.getElementById("avatar").src = 'http://www.gravatar.com/avatar/205e460b479e2e5b48aes07710c0ad50?d=mm';
        }
      })
  }

  getUser(){
    var self = this;
    var username = this.$state.params.username;

    if (this.$rootScope.user && username === this.$rootScope.user.name) {
      self.tmpUser = this.$rootScope.user;
    };

    this.request.get('api/user/' + username)
      .then(function (res) {
        self.getAvatar(res.results.name);
        self.url = 'http://acadweb1.salisbury.edu/~NT9736/upload.php?id=' + res.results.name + '&table=Users&column=name&callback=' +window.location.href ;
        document.getElementById('profile-form').action = self.url;
        return self.tmpUser = res.results;
      })
      .then(function () {
        return self.request.get('api/group/user/' + username);
      })
      .then(function (groups) {
        self.tmpUser.groups = groups.results;
        return self.request.get('api/package/' + username);
      })
      .then(function (pkgs) {
        self.tmpUser.pkgs = pkgs.results;
        console.log(pkgs);
      })
  }
}