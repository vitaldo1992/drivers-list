(function() {
  angular.module('app').component('usersListComponent', {
    controller: UsersListController,
    controllerAs: 'vm',
    templateUrl: 'users-list/users-list.component.html'
  });

  UsersListController.$inject = ['usersService', '$rootScope'];

  function UsersListController(usersService, $rootScope) {
    this.users = [];

    this.loadUsers = () => {
      usersService.loadList().then(list => {
        this.users = list;
      });
    }

    const updateList = $rootScope.$on('update-list', () => this.loadUsers());

    this.$onInit = () => this.loadUsers();
    this.$onDestroy = () => updateList();
  }
})();
