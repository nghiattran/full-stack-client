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
        self.getMemberImages(res.results.members);
        self.getAvatar(res.results.groupName);
        self.setPostUrl();
        return self.request.get('api/package/' + name)
      })
      .then(function (res) {
        self.tmpGroup.pkgs = res.results;
      })
      .catch(function (err) {
        // self.$state.go('profile', {name:});
        return err;
      });
  }

  getMemberImages(members) {
    for (var i = 0; i < members.length; i++) {
      this.getMemberImage(members[i]);
    };
  }

  getMemberImage(member) {
    this.$http.get('http://acadweb1.salisbury.edu/~NT9736/getImage.php?table=Users&column=name&id=' + member.name)
      .then(function (res) {
        if (res.data) {
          member.image = "data:image/png;base64, " + res.data;
        } else {
          member.image = 'http://www.gravatar.com/avatar/205e460b479e2e5b48aes07710c0ad50?d=mm';
        }
      })
  }

  invite(form) {
    form.group = this.tmpGroup.groupName;
    var self = this;
    this.request.post('api/group/invite', form)
      .then(function (res) {
        form = undefined;
        self.getGroup();
      })
      .catch(function (err) {
        self.getGroup();
        return err;
      });
  }

  kick(form) {
    form.group = this.tmpGroup.groupName;
    var self = this;
    this.request.post('api/group/kick', form)
      .then(function (res) {
        form = undefined;
        self.getGroup();
      })
      .catch(function (err) {
        self.getGroup();
        return err;
      });
  }
}