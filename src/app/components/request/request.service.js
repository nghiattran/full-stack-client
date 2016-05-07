export class requestService {
  constructor ($log, $http, $cookies, $rootScope, jwtHelper) {
    'ngInject';

    this.$log = $log;
    this.$cookies = $cookies;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.jwtHelper = jwtHelper;
    this.apiHost = null || 'http://localhost:9000/';
  }

  setUrl(endpoint){
    return this.apiHost + endpoint;
  }

  get(endpoint, params) {
    var req = {
      method: 'GET',
      'cache-control': 'no-cache',
      url: this.apiHost + endpoint,
      headers: {
        Authorization: this.$cookies.get('token') || null
      },
      params: params
    }
    return this.$http(req)
            .then(function (res) {
              return res.data;
            });
  }
  
  post(endpoint, payload) {
    var config ={
      headers: {Authorization: this.$cookies.get('token') || null}
    }
    console.log(payload);
    return this.$http.post(this.setUrl(endpoint), payload, config)
  }

  put(endpoint, payload) {
    var config ={
      headers: {Authorization: this.$cookies.get('token')}
    }
    return this.$http.put(this.setUrl(endpoint), payload, config)
  }

  signup(user) {
    var that = this;
    return this.post("api/user", user)
      .then(function (res) {
        that.signin(user)
      })
  }

  signin(user) {
    var that = this;
    return this.post("auth/local", user)
      .then(function (res) {
        that.$cookies.put('token', res.data.token);
        if (!('error' in res.data)) {
          that.getUser();
        }
        return res.data;
      })
      .catch(function (err) {
        console.log('err',err);
        return err.data;
      });
  }

  requestReset(user) {
    return this.post("api/user/reset", user)
      .then(function (res) {
        return res.data;
      })
      .catch(function (err) {
        return err.data;
      });
  }

  logout() {
    this.$cookies.remove('token');
    this.$rootScope.user = null;
  }

  getUser() {
    var self = this;
    return this.get('api/user/me')
      .then(function (res) {
        console.log(self.$rootScope.user);
        self.$rootScope.user = res.results;
        self.getGroups();
        console.log(self.$rootScope.user);
      })
      .catch(function (err) {
        console.log('err', err);
        self.logout();
      })
  }

  getGroups() {
    var self = this;

    if (!this.$rootScope.user) {
      return getUser().then(function (res) {
        return self.getGroups();
      });
    }
    console.log(this.$rootScope.user);
    return this.get('api/group/user/' + this.$rootScope.user.name)
      .then(function (res) {
        self.$rootScope.user.groups = res.results;
      })
  }

}

