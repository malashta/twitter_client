(function() {
  'use strict';

  angular
    .module('pl')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, twitterService, $scope, $mediator, $localStorage, $window, $log, baseActions) {
    var vm = this;
    vm.tweets = []; //array of tweets
    $scope.tweet = {};
    vm.status = false;
    vm.classAnimation = '';
    vm.creationDate = 1464185578640;
    vm.dataBase = Object.create(null);
    vm.twitterConnect = twitterConnect;
    vm.refreshTimeline = refreshTimeline;
    vm.showContentDetail = showContentDetail;
    vm.setLikePost = setLikePost;

    activate();

    $scope.$watch('status',function(){
      if(vm.status) {
        refreshTimeline();
      }
    });

    function setLikePost (post) {
      twitterService.addToFavorite(post.id_str).then(function(data){
        $log.log(data);
      });
    }

    function showContentDetail (tweet) {
      if($localStorage.second.status == 'close') {
        $window.open('/#/second');
       // $localStorage.detail = {tweet:tweet};
        $scope.tweet = tweet;
      } else {
       // $localStorage.detail = {tweet:tweet};
        $scope.tweet = tweet;
      }
    }

    function refreshTimeline () {
      twitterService.getLatestTweets().then(function(data) {
        vm.tweets = data;
        $log.info(data);
      });
    }

    function twitterConnect() {
      twitterService.connectTwitter().then(function() {
        if (twitterService.isReady()) {
          vm.status = true;
          refreshTimeline();
          $mediator.$emit('isConnect',{});
        }
      });
    }

    function activate() {
      twitterService.initialize();
      vm.dataBase = baseActions.initBase();
      vm.dataBase.$bindTo($scope, "tweet");
      $localStorage.second = {status:'close'};
      vm.status = twitterService.isReady() ? true : false;
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }
  }
})();
