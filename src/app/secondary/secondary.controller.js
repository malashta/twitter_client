/**
 * Created by Tallerr on 25.05.2016.
 */
(function() {
  'use strict';

  angular
    .module('pl')
    .controller('SecondaryController', SecondaryController);

  function SecondaryController($scope, twitterService, $localStorage, $log, baseActions){
    var vm = this;
    $scope.tweet = {};
    var imagePath = '';

    twitterService.initialize();
    vm.dataBase = baseActions.initBase();
    vm.dataBase.$bindTo($scope, "tweet");

    $scope.$watch('tweet',function(){
      $log.log($scope.tweet);
      vm.imagePath = $scope.tweet.user.profile_image_url;
    });

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
