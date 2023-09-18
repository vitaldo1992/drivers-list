(function () {
  'use strict';
  angular.module('app').config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.when('/', '/login');

    $stateProvider.state('not-found', {
      // Catch all
      url: '*path',
      templateUrl: 'components/not-found/notfound.template.html'
    });

    $stateProvider.state('forbidden', {
      // Catch all
      url: '/forbidden',
      templateUrl: 'components/forbidden/forbidden.template.html'
    });
  }
})();
