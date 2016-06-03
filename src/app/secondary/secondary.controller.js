/**
 * Created by Tallerr on 25.05.2016.
 */
(function() {
  'use strict';

  angular
    .module('pl')
    .controller('SecondaryController', SecondaryController);

  function SecondaryController($scope, twitterService, $localStorage, $log, baseActions, $window){
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
      $log.log(tweet);
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
})();
