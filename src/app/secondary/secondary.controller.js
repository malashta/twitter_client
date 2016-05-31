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

    twitterService.initialize();
    vm.dataBase = baseActions.initBase();
    vm.dataBase.$bindTo($scope, "tweet");

    $localStorage.second = {status:'open'};

  }
})();
