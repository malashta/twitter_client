(function() {
  'use strict';

  angular
    .module('pl')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, twitterService, $scope, $mediator) {
      var vm = this;
      vm.relativeDate = moment(vm.creationDate).fromNow();
      vm.status = twitterService.isReady() ? true : false;
      vm.profile = Object.create(null);

      $mediator.$on('isConnect',function(){vm.status = true;});

      $scope.$watch('status',function(){
        if(vm.status) {
          twitterService.getUserProfile().then(function (response) {
            vm.profile = response;
            console.log(response);
          });
        }
      });

    }
  }

})();
