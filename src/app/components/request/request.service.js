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
        if (!('error' in res.data)) {
          that.getUser();
        }
        return res.data;
      })
      .catch(function (err) {
        return err.data;
      });
  }

  signin(user) {
    var that = this;
    return this.post("auth/local", user)
      .then(function (res) {
        if (!('error' in res.data)) {
          that.getUser();
        }
        return res.data;
      })
      .catch(function (err) {
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
    console.log(this.$rootScope.user);
    if (this.$rootScope.user && this.$rootScope.user.provider === 'google') {
      googleSignOut();
    };
    this.$rootScope.user = null;
  }

  getUser() {
    var self = this;
    if (!this.$cookies.get('token')) {
      return ;
    };

    this.get('api/user/me')
      .then(function (res) {
        self.$rootScope.user = res.results;
      })
      .catch(function (err) {
        console.log(err);
        self.logout();
      })
  }

}


function googleSignOut() {
  console.log('here');
  gapi.auth.signOut();
}