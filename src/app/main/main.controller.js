export class MainController {
  constructor ($timeout, webDevTec, toastr, $http, $scope, $rootScope) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1455574504555;
    this.toastr = toastr;
    this.$http = $http;
    this.$scope = $scope;
    this.getImage();
    this.activate($timeout, webDevTec);
  }

  activate($timeout, webDevTec) {
    this.getWebDevTec(webDevTec);
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  getImage() {
    // this.$http.get('http://acadweb1.salisbury.edu/~NT9736/getImage.php?id=2000')
    //   .then(function (res) {
    //     document.getElementById("ItemPreview").src = "data:image/png;base64, " + res.data;
    //   })
  }

  showToastr() {
    // console.log('here');
    // console.log(this.toastr);
    // this.toastr.options.preventDuplicates = false;
    // this.toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!')
  }
}
