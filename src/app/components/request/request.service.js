export class requestService {
  constructor ($log, $http, $cookies) {
    'ngInject';

    this.$log = $log;
    this.$cookies = $cookies;
    this.$http = $http;
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
        Authorization: this.$cookies.get('token')
      },
      params: params
    }
    return this.$http(req);
  }

  post(endpoint, data)
  {
    var config ={
      headers: {Authorization: this.$cookies.get('token')}
    }
    return this.$http.post(this.setUrl(endpoint), data, config)
  }

  signup(user) {
    return this.processSignup(user, this.$cookies);
  }

  processSignup(user, $cookies) {
    return this.post("api/user", user)
      .then(function (res) {
        if (!('error' in res.data)) {
          $cookies.put('token', res.data.token); 
        }
        return res.data;
      })
      .catch(function (err) {
        return err.data;
      });
  }

  signin(user) {
    return this.processSignin(user, this.$cookies);
  }

  processSignin(user, $cookies) {
    return this.post("auth/local", user)
      .then(function (res) {
        if (!('error' in res.data)) {
          $cookies.put('token', res.data.token); 
        }
        return res.data;
      })
      .catch(function (err) {
        return err.data;
      });
  }
}
