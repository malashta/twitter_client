/**
 * Created by Tallerr on 25.05.2016.
 */
(function() {
  'use strict';

  angular
    .module('pl')
    .controller('SecondaryController', SecondaryController)
    .controller('dialogController', dialogController);

  function SecondaryController($scope, twitterService, $localStorage, $log, baseActions, $window, $mdDialog, $mdMedia){
    var vm = this;
    vm.Date = $window.Date;
    $scope.tweet = {};
    vm.tweets = [];
    vm.replyToTweet = replyToTweet;
    var imagePath = '';

    twitterService.initialize();
    vm.dataBase = baseActions.initBase();
    vm.dataBase.$bindTo($scope, "tweet");

    $scope.$watch('tweet',function() {
      if($scope.tweet.hasOwnProperty('id')) {
        $log.log($scope.tweet);
        vm.tweets.push($scope.tweet);
        vm.imagePath = $scope.tweet.user.profile_image_url;
        twitterService.getUserTimeline($scope.tweet.user.screen_name).then(function(data){
          vm.tweets = data;
          $log.log(data);
        });
      }
    });

    function replyToTweet(tweet) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
          controller: dialogController,
          templateUrl: 'app/secondary/dialog.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          fullscreen: useFullScreen,
          targetEvent: tweet
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    }

    $localStorage.second = {status:'open'};

    vm.messages = [{
      face : vm.imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face : vm.imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face : vm.imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face : vm.imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face : vm.imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }];
  }

  function dialogController($scope, $mdDialog, targetEvent){

    $scope.item = targetEvent;

    console.log(targetEvent);

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
})();
