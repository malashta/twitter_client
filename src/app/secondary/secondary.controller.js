/**
 * Created by Tallerr on 25.05.2016.
 */
(function() {
  'use strict';

  angular
    .module('pl')
    .controller('SecondaryController', SecondaryController);

  function SecondaryController($scope, twitterService, $localStorage){
    var vm = this;
    //vm.status = twitterService.isReady() ? true : false;
    vm.tweet = $localStorage.detail.tweet;

    twitterService.initialize();

    $localStorage.second = {status:'open'};

    $scope.$watch(function () { return $localStorage.detail.tweet },function(){
      //twitterService.getTweetDetails($localStorage.detail.tweet.id).then(function(data){
      //  vm.tweet = data;
      //  console.log(data);
      //});
      vm.tweet = $localStorage.detail.tweet;
      console.info($localStorage.detail.tweet);
    });

    //twitterService.getTweetDetails($localStorage.detail.tweet).then(function(data){
    //  vm.tweet = data;
    //});



  }
})();
