'use strict';

export class UserController {
  constructor (request, $cookies, $log, $state, $rootScope, jwtHelper, $scope) {
    'ngInject';
    this.request = request;
    this.$state = $state;
    this.$cookies = $cookies;
    this.$log = $log;
    this.jwtHelper = jwtHelper;
    this.$rootScope = $rootScope;
    $scope.isCollapsed = true;
  }

  requestReset(user) {
    var self = this;
    this.request.requestReset(user)
      .then(function (res) {
        self.$state.go('home');
        return res;
      })
      .catch(function (err) {
        return err;
      });
  }

  updateUser(user) {
    var self = this;
    var url = 'request/user/'+self.$rootScope.user._id+'/setting';
    this.request.put(url,user)
      .then(function (res) {
        self.$state.go('home');
        return res;
      })
      .catch(function (err) {
        return err;
      });
  }

  // var myApp = angular.module('myApp', ['ui.bootstrap']);

  //   NavBarCtrl($scope) {
  //       $scope.isCollapsed = true;
  //   }
}
