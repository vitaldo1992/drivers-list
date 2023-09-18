(function() {
  'use strict';
  angular.module('app').component('notifications', {
    templateUrl: 'components/notifications/notifications.component.html',
    controller: Notifications,
    controllerAs: 'notification'
  });

  Notifications.$inject = ['$rootScope', '$scope', '$timeout'];

  function Notifications($rootScope, $scope, $timeout) {

    const successHandler = $rootScope.$on('successMessage', (event, text) => {
      this.type = 'success';
      this.text = text;
      this.hideMessage();
    });

    const errorHandler = $rootScope.$on('errorMessage', (event, text) => {
      this.type = 'error';
      this.text = text;
      this.hideMessage();
    });

    this.hideMessage = () => {
      $timeout(() => {
        this.type = null;
        $scope.$apply();
      }, 5000);
    }

    this.$onDestroy = () => {
      successHandler();
      errorHandler();
    }
  }
})();
