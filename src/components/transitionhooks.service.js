(function () {
  'use strict';
  angular.module('app').factory('transitionHooksService', transitionHooksService);

  transitionHooksService.$inject = ['$rootScope', '$transitions', '$timeout'];
  function transitionHooksService($rootScope, $transitions, $timeout) {

    return {
      registerTransitionHooks
    };

    ////////////////

    /**
     * Registers all the UI-Router transition hooks for the application
     */
    function registerTransitionHooks() {
      const deregisterFn = $transitions.onSuccess({}, function () {
        // Add delay to demo the loader.
        $timeout(function () {
          if (!$rootScope.bootstrapped) {
            $rootScope.bootstrapped = {};
            deregisterFn();
          }
        }, 500);
      });
    }
  }
})();
