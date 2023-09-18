(function() {
  angular.module('app').component('login', {
    controller: LoginController,
    controllerAs: 'vm',
    templateUrl: 'login/login.component.html',
  });

  LoginController.$inject = ['appSession', '$state', '$rootScope'];

  function LoginController(appSession, $state, $rootScope) {
    this.appSession = appSession;
    this.$state = $state;
    this.logIn = ({userName, password}) => {
      this.appSession.login({userName, password}).then(
        () => this.$state.go('home'),
        error => $rootScope.$broadcast('errorMessage', error?.message)
      );
    };
  }
})();
