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
    this.tmpPgk = {};
    this.get();
    this.getUser();
    this.getViewers();
  }

  get(file) {
    file = file || 'README.md'
    var url = 'https://raw.githubusercontent.com/{{username}}/{{pkgName}}/master/';

    url = url
            .replace('{{username}}', this.username)
            .replace('{{pkgName}}', this.pkgName)
    var self = this;
    this.$http.get(url + file)
      .then(function (res) {
        self.tmpPgk.markdown = res.data;
      })
      .catch(function (err) {
        return self.$http.get(url + 'readme.md')
          .then(function (res) {
            self.tmpPgk = {};
            self.tmpPgk.markdown = res.data;
          })
          .catch(function (err) {
            self.tmpPgk.markdown = '### This package does not have a README file';
          })
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
        self.getVersions();
      })
      .catch(function (res) {
        return self.request.get('api/group/' + self.username)
          .then(function (res) {
            self.tmpUser = res.results;
            self.getAvatar(self.tmpUser, 1);
            self.getVersions();
            self.tmpUser.type = 1;
          })
      })
      
  }

  getAvatar(user, type) {
    var url = 'http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Users&column=name&id=';
    if (type === 1) {
      url = 'http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Groups&column=name&id=';
    };
    this.$http.get(url + user.name)
      .then(function (res) {
        if (res.data) {
          user.image = "data:image/png;base64, " + res.data;
        } else {
          user.image = 'http://www.gravatar.com/avatar/205e460b479e2e5b48aes07710c0ad50?d=mm';
        }
      })
  }

  getVersions() {
    var self = this;
    this.request.get('api/package/' + this.$state.params.username + '/' + this.pkgName)
      .then(function (res) {
        self.tmpPgk.versions = res.results;
        console.log(res.results);
      })
  }

  grantPermission(form) {
    var self = this;
    form.packageId = this.tmpPgk.versions[0].packageId;

    console.log(form);
    this.request.post('api/package/share', form)
      .then(function (res) {
        self.getViewers();
      })
      .catch(function (err) {
        self.getViewers();
      })
  }

  getViewers() {
    var self = this;
    this.request.get('api/package/access/' + this.pkgName)
      .then(function (res) {
        self.tmpPgk.viewers = res.results;
        self.getViewerImages(res.results)
      })
  }

  getViewerImages(viewers) {
    console.log(viewers);
    for (var i = 0; i < viewers.length; i++) {
      this.getViewerImage(viewers[i]);
    };
  }

  getViewerImage(viewer) {
    this.$http.get('http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Users&column=name&id=' + viewer.figureName)
      .then(function (res) {
        if (res.data) {
          viewer.image = "data:image/png;base64, " + res.data;
        } else {
          viewer.image = 'http://www.gravatar.com/avatar/205e460b479e2e5b48aes07710c0ad50?d=mm';
        }
      })
  }
}