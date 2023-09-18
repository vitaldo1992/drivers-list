(function() {
  'use strict';
  angular.module('app').component('userRow', {
    templateUrl: 'users-list/user-row/user-row.component.html',
    controller: UsersRowController,
    bindings: {
      user: '='
    }
  });

  function UsersRowController() {
  }
})();
