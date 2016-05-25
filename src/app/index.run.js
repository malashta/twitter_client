(function() {
  'use strict';

  angular
    .module('pl')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
