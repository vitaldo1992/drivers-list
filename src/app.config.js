(function () {
  'use strict';
  angular.module('app').config(config).run(run);

  config.$inject = [
    '$qProvider',
    '$logProvider',
    'appSettings',
  ];

  function config(
    $qProvider,
    $logProvider,
    appSettings
  ) {
    $qProvider.errorOnUnhandledRejections(appSettings.debugMode);
    $logProvider.debugEnabled(appSettings.debugMode);
  }

  run.$inject = ['transitionHooksService'];

  function run(transitionHooksService) {
    // UI-Router transition hooks
    transitionHooksService.registerTransitionHooks();
  }
})();
