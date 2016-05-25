(function() {
  'use strict';

  angular
    .module('pl')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    document.addEventListener("deviceready", function () {
      $cordovaPlugin.someFunction().then(success, error);
    }, false);
    $log.debug('runBlock end');
  }

})();
