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
      })
      .state('contacts', {
        url: '/contacts',
        templateUrl:'app/contacts/contacts.html',
        controller:'ContactsController',
        controllerAs:'contacts'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
