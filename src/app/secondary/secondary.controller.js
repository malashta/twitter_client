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
    vm.status = twitterService.isReady() ? true : false;
    vm.tweet = {};

    $localStorage.second = {status:'open'};

    //twitterService.getTweetDetails($localStorage.detail.tweet).then(function(data){
    //  vm.tweet = data;
    //});



  }
})();
