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
      this.username = 'nghiattran';
    };
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
      return self.tmpUser = this.$rootScope.user;
    };

    this.request.get('api/user/' + this.$state.params.username)
      .then(function (res) {
        self.tmpUser = res.results;
        self.tmpUser.type = 0;
      })
      .catch(function (res) {
        return self.request.get('api/group/' + self.username)
          .then(function (res) {
            self.tmpUser = res.results;
            self.tmpUser.type = 1;
          })
      })
      
  }
}