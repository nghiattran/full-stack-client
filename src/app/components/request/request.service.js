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
    return this.$http(req);
  }

  post(endpoint, payload)
  {
    var config ={
      headers: {Authorization: this.$cookies.get('token') || null}
    }
    return this.$http.post(this.setUrl(endpoint), payload, config)
  }

  put(endpoint, payload)
  {
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
          that.$cookies.put('token', res.data.token); 
          that.setUser();
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
          that.$cookies.put('token', res.data.token);
          that.setUser();
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

  logout(token) {
    this.$cookies.remove(token || 'token');
    this.setUser(token);
  }

  getToken(token)
  {
    var token = this.$cookies.get(token || 'token');
    if (token == undefined) {
      return undefined;
    } else {
      try{
        return this.jwtHelper.decodeToken(token)
      }catch(err) {
        return undefined;
      }
    }
  }

  setUser(token)
  {
    this.$rootScope.user = this.getToken(token);
  }

  getUser(token)
  {
    return this.getToken(token);
  }
}
