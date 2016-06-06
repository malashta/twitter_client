/**
 * Created by Tallerr on 25.05.2016.
 */
(function() {
  'use strict';

  angular
    .module('pl')
    .controller('SecondaryController', SecondaryController)
    .controller('DialogController', DialogController);

  function SecondaryController($scope, twitterService, $localStorage, $log, baseActions, $document, $window, $mdDialog, $mdMedia){
    var vm = this;
    vm.Date = $window.Date;
    $scope.tweet = {};
    vm.tweets = [];
    vm.replyToTweet = replyToTweet;
    vm.setLikePost = setLikePost;

    twitterService.initialize();
    vm.dataBase = baseActions.initBase();
    vm.dataBase.$bindTo($scope, "tweet");

    if (twitterService.isReady()) {
      vm.status = true;
    }

    $scope.$watch('tweet', function () {
      if($scope.tweet.hasOwnProperty('id')) {
        vm.tweets.push($scope.tweet);
        vm.imagePath = $scope.tweet.user.profile_image_url;
        if (twitterService.isReady()) {
          twitterService.getUserTimeline($scope.tweet.user.screen_name).then(function (data) {
            vm.tweets = data;
          });
        } else {
          twitterService.connectTwitter().then(function() {
            twitterService.getUserTimeline($scope.tweet.user.screen_name).then(function (data) {
              vm.tweets = data;
            });
          });
        }
      }
    });

    function setLikePost (post) {
      twitterService.addToFavorite(post.id_str).then( function (data) {
        $log.log(data);
      });
    }

    function replyToTweet (tweet) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/secondary/dialog.html',
          parent: angular.element($document.body),
          clickOutsideToClose:true,
          fullscreen: useFullScreen,
          targetEvent: tweet
        })
        .then( function (answer) {
          var mess = {};
          if(answer) {
            mess.in_reply_to_status_id = tweet.id_str;
            mess.status = answer;
            twitterService.addStatusesUpdate(mess).then(function(data){
              $log.info(data);
            });
          } else if(answer!==false) {
            mess.id = tweet.id_str;
            twitterService.addStatusesRetweet(mess).then(function(data){
              $log.log(data);
            });
          }
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      $scope.$watch( function () {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    }

    $localStorage.second = {status:'open'};

    vm.messages = [];
  }

  function DialogController($scope, $mdDialog, targetEvent){

    $scope.textmodel = '';

    $scope.item = targetEvent;

    $scope.hide = function () {
      $mdDialog.hide();
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }
})();
