(function () {
  'use strict';
  angular.module('app').directive('repeatPassword', RepeatPassword);

  function RepeatPassword() {
    return  {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        repeatPassword: '='
      },
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.repeatPassword = function(modelValue) {
          return !(modelValue && scope.repeatPassword !== modelValue);
        };
      }
    };
  }
})();
