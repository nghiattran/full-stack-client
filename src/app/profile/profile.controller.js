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
        self.getGroupImages(groups.results);
        self.getGroupsPackages(groups.results);
        console.log(groups.results);
        return self.request.get('api/package/' + username);
      })
      .then(function (pkgs) {
        self.tmpUser.pkgs = pkgs.results;
        console.log(pkgs);
      })
  }

  getGroupsPackages(groups) {
    console.log(groups);
    for (var i = 0; i < groups.length; i++) {
      console.log(groups[i]);
      this.getGroupPackage(groups[i]);
    };
  }

  getGroupPackage(group) {
    var self = this;
    this.request.get('api/package/' + group.groupName)
      .then(function (pkgs) {
        if (!self.tmpUser.groupPkgs) {
          self.tmpUser.groupPkgs = pkgs.results;
        } else {
          for (var i = 0; i < pkgs.results.length; i++) {
            self.tmpUser.groupPkgs.push(pkgs.results[i]);
          };
        }
        console.log(self.tmpUser.groupPkgs);
        group.pkgs = pkgs.results;
      })
  }

  getGroupImages(groups) {
    for (var i = 0; i < groups.length; i++) {
      this.getGroupImage(groups[i]);
    };
  }

  getGroupImage(group) {
    this.$http.get('http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Groups&column=name&id=' + group.groupName)
      .then(function (res) {
        if (res.data) {
          group.image = "data:image/png;base64, " + res.data;
        } else {
          group.image = 'https://avatars3.githubusercontent.com/u/15514893?v=3&s=200';
        }
      })
  }
}