(function() {
  'use strict';
  angular.module('app').config(routes);

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider.state('users-list', {
      url: '/users-list',
      component: 'usersListComponent',
      resolve: {
        isAdmin: ['$q', 'appSession', '$state', function($q, appSession, $state) {
          const deferred = $q.defer();
          appSession.isAdmin().then(
            () => deferred.resolve(true),
            () => {
              $state.go('forbidden');
              deferred.reject();
            });
          return deferred;
        }]
      }
    });

    $stateProvider.state('settings', {
      url: '/settings/{id}',
      parent: 'users-list',
      component: 'userSettings'
    });

    $stateProvider.state('create', {
      url: '/create',
      parent: 'users-list',
      component: 'userSettings'
    });
  }
})();
