(function () {
  'use strict';

  angular.module('app').factory('appSession', appSession);

  appSession.$inject = ['$q', 'usersService', '$window'];

  /* @ngInject */
  function appSession($q, usersService, $window) {

    return {
      login,
      isAdmin
    };

    function login(user) {
      const currentUser = usersService.sessionUsers().find(existingUser => existingUser.userName === user.userName && existingUser.password === user.password);
      if (currentUser) {
        return $q.resolve({
          token: currentUser.id
        }).then((token) => {
          $window.localStorage.setItem('token' , token);
          $window.localStorage.setItem('user', JSON.stringify(currentUser));
        });
      } else {
        return $q.reject({
          message: "User does not exist or password isn't correct"
        });
      }
    }

    function isAdmin() {
      const session = $window.localStorage.getItem('user');
      const isAdmin = session && JSON.parse(session).type === 'Admin';
      if (isAdmin) {
        return $q.resolve();
      }
      return $q.reject();
    }
  }
})();
