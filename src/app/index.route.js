(function() {
  'use strict';

  angular
    .module('pl')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('second', {
        url: '/second',
        templateUrl: 'app/secondary/secondary.html',
        controller: 'SecondaryController',
        controllerAs: 'second'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
