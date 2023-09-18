(function () {
  'use strict';
  angular.module('app').config(routes);

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      component: 'home'
    });
  }
})();
