(function() {
  'use strict';

  angular
    .module('pl')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, twitterService, $scope, $mediator, $localStorage, $window) {
    var vm = this;

    twitterService.initialize();

    console.log($localStorage);

    $localStorage.second = {status:'close'};


    vm.tweets = []; //array of tweets
    vm.status = twitterService.isReady() ? true : false;
    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1464185578640;
    vm.showToastr = showToastr;
    vm.twitterConnect = twitterConnect;
    vm.refreshTimeline = refreshTimeline;
    vm.showContentDetail = showContentDetail;

    activate();

    $scope.$watch('status',function(){
      if(vm.status) {
        twitterService.getUserProfile().then(function (response) {
          refreshTimeline();
        });
      }
    });

    function showContentDetail (tweet) {
      if($localStorage.second.status == 'close') {
        $window.open('http://localhost:3000/#/second');
        $localStorage.detail = {tweet:tweet};
      } else {
        $localStorage.detail = {tweet:tweet};
      }
    }

    function refreshTimeline () {
      twitterService.getLatestTweets().then(function(data) {
        vm.tweets = data;
        console.info(data);
      });
    }

    function twitterConnect() {
      twitterService.connectTwitter().then(function() {
        if (twitterService.isReady()) {
          vm.status = true;
          $mediator.$emit('isConnect',{});
        }
      });
    }

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
