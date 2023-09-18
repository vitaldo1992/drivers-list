(function() {
  'use strict';
  angular.module('app').component('userSettings', {
    templateUrl: 'users-list/user-settings/user-settings.component.html',
    controller: UserSettings,
    controllerAs: 'vm'
  });

  UserSettings.$inject = ['usersService', '$stateParams', '$rootScope', '$state'];

  function UserSettings(usersService, $stateParams, $rootScope, $state) {

    this.passwordRegex = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';

    this.$onInit = () => {
      const userId = $stateParams.id;
      this.createMode = !userId;

      if (userId) {
        usersService.loadUser(+$stateParams.id).then(user => {
          this.user = user;
          this.updateInitials(user);
        });
      }
    }

    this.deleteUser = (id) => {
      usersService.deleteUser(id).then(() => this.updateView());
    };

    this.createUser = (id) => {
      usersService.createUser(id).then(
        user => {
          this.updateView();
          $rootScope.$broadcast('successMessage', 'User was successfully created!');
          this.updateInitials(user);
        },
        () => {
          this.nameUniqueError = true;
          $rootScope.$broadcast('errorMessage', 'User Name is not unique!');
        }
      );
    };

    this.updateUser = (user) => {
      usersService.updateUser(user).then(() => {
        $rootScope.$broadcast('update-list');
        $rootScope.$broadcast('successMessage', 'User was successfully updated!');
        this.updateInitials(user);
      });
    };

    this.updateView = () => {
      $rootScope.$broadcast('update-list');
      $state.go('users-list');
    }

    this.updateInitials = (user) => {
      this.userInitials = `${user.firstName} ${user.lastName}`;
    }
  }
})();
