(function() {
  angular.module('app').component('home', {
    controller: HomeController,
    controllerAs: 'vm',
    templateUrl: 'home/home.component.html',
  });

  HomeController.$inject = [];

  function HomeController() {

    activate();

    function activate() {}
  }
})();
