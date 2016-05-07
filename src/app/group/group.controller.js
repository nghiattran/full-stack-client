'use strict'

export class GroupController {
  constructor (request, $cookies, $log, $state, $rootScope, $http) {
    'ngInject'
    this.request = request;
    this.$state = $state;
    this.$cookies = $cookies;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.$http = $http;
  }

  getAvatar(name) {
    console.log(this.$rootScope.user);
    console.log('http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Groups&column=name&id=' + name);
    this.$http.get('http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Groups&column=name&id=' + name)
      .then(function (res) {
        var src;
        if (res.data) {
          src = "data:image/png;base64, " + res.data;
        } else {
          src = 'https://avatars3.githubusercontent.com/u/15514893?v=3&s=200';
        }
        document.getElementById("group-avatar").src = src;
      })
  }

  create(tmpGroup) {
    var self = this;
    this.request.post('api/group',tmpGroup)
      .then(function (res) {
        self.$state.go('groups.group', {groupName: tmpGroup.name});
      })
      .catch(function (err) {
        return err;
      });
  }

  getAll() {

  }

  setPostUrl() {
    if (!this.tmpGroup.groupName || !document.getElementById('group-avatar-form')) {
      return 
    };
    var uploadUrl = 'http://acadweb1.salisbury.edu/~NT9736/upload.php?id=' + this.tmpGroup.groupName + '&table=Groups&column=name&callback=' + window.location.href ;
    document.getElementById('group-avatar-form').action = uploadUrl;
    console.log(uploadUrl);
  }

  getGroup() {
    console.log('here');
    var name = this.$state.params.groupName;
    var url = 'api/group/' + name;
    var self = this;

    this.request.get(url)
      .then(function (res) {
        self.tmpGroup = res.results;
        console.log(self.tmpGroup);
        self.getAvatar(res.results.groupName);
        self.setPostUrl();
        return self.request.get('api/package/' + name)
      })
      .then(function (res) {
        self.tmpGroup.pkgs = res.results;
      })
      .catch(function (err) {
        self.$state.go('profile.me');
        return err;
      });
  }

  // getGroupImage() {

  //   var url = 'http://acadweb1.salisbury.edu/~NT9736/getImage.php?id={{id}}&table=Groups&column={{table_name}}';

  //   this.$http.get()
  //     .then(function (res) {
  //       document.getElementById("ItemPreview").src = "data:image/png;base64, " + res.data;
  //     })
  // }
}