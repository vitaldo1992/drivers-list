(function() {
  'use strict';

  angular.module('app').factory('usersService', usersService);

  usersService.$inject = ['$q'];

  /* @ngInject */
  function usersService($q) {

    let fakeUsers = [
      {
        userName: 'Vital1992',
        id: 1,
        firstName: 'Vitalii',
        lastName: 'Duvalko',
        email: 'vitaliy.duvalko@gmail.com',
        type: 'Admin',
        password: '1111111a'
      },
      {
        userName: 'Olena1994',
        id: 2, firstName: 'Olena',
        lastName: 'Senko',
        email: 'olena.senko@gmail.com',
        type: 'Driver',
        password: '1111111a'
      }
    ];

    return {
      loadList,
      loadUser,
      deleteUser,
      createUser,
      updateUser,
      sessionUsers
    };

    function sessionUsers() {
      return fakeUsers;
    }

    function loadList() {
      return $q
        .resolve(fakeUsers);
    }

    function loadUser(id) {
      return $q
        .resolve(angular.copy(fakeUsers.find(user => user.id === id)));
    }

    function deleteUser(id) {
      return $q
        .resolve(fakeUsers.filter(user => user.id !== id))
        .then(newList => {
          fakeUsers = newList;
          return true;
        });
    }

    function createUser(user) {
      if (fakeUsers.find(currentUser => currentUser.userName === user.userName)) {
        return $q.reject();
      }
      return $q
        .resolve(user)
        .then(user => {
          fakeUsers = [...fakeUsers, {
            ...user,
            id: ++fakeUsers.length
          }];
          return user;
        });
    }

    function updateUser(update) {
      const oldUser = fakeUsers.find(user => user.id === update.id);
      const updatedUser = {
        ...oldUser,
        ...update
      };
      return $q
        .resolve(updatedUser)
        .then(() => fakeUsers = fakeUsers.map(user => updatedUser.id === user.id ? updatedUser : user));
    }
  }
})();
