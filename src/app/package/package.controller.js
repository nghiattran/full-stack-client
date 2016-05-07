'use strict'

export class PackageController {
  constructor (request, $http, $log, $state, $rootScope) {
    'ngInject'
    this.request = request;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$log = $log;
    this.$http = $http;
    this.username = this.$state.params.username;
    this.pkgName = this.$state.params.pkgName;
    if (this.username === 'nghiattran3') {
      this.username = 'nghiattran'
    };
    console.log(this.username);
    console.log(this.$state.params);
    this.get();
    this.getUser();
  }

  get() {
    var url = 'https://raw.githubusercontent.com/{{username}}/{{pkgName}}/master/README.md';

    url = url
            .replace('{{username}}', this.username)
            .replace('{{pkgName}}', this.pkgName)
    var self = this;
    this.$http.get(url)
      .then(function (res) {
        self.tmpPgk = {};
        self.tmpPgk.markdown = res.data;
      })
      .catch(function (err) {
        self.tmpPgk.markdown = '### This package does not have a README file';
      })
  }

  getUser() {
    var self = this;

    if (this.$rootScope.user && this.username === this.$rootScope.user.name) {
      this.$rootScope.user.type = 0;
      this.getAvatar(this.$rootScope.user);
      return self.tmpUser = this.$rootScope.user;
    };
    console.log('api/user/' + this.$state.params.username);
    this.request.get('api/user/' + this.$state.params.username)
      .then(function (res) {
        console.log(res);
        self.tmpUser = res.results;
        self.tmpUser.type = 0;
        self.getAvatar(self.tmpUser);
      })
      .catch(function (res) {
        return self.request.get('api/group/' + self.username)
          .then(function (res) {
            self.tmpUser = res.results;
            self.tmpUser.type = 1;
          })
      })
      
  }

  getAvatar(user) {
    this.$http.get('http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Users&column=name&id=' + user.name)
      .then(function (res) {
        if (res.data) {
          user.image = "data:image/png;base64, " + res.data;
        } else {
          user.image = 'https://avatars3.githubusercontent.com/u/15514893?v=3&s=200';
        }
      })
  }
}