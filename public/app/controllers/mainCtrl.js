angular.module('mainCtrl', [])

.controller('mainController', function($scope, $http, Auth){

  var vm = this;
  alert('test: mainCtrl');

  //proverava da li je korisnik ulogovan
  vm.loggedIn = Auth.isLoggedIn();

  vm.test = 'test mikla';

  //na svakom requestu proverava da li je koristnik ulogovan
  $rootScope.$on('$routeChangeStart', function(){
    vm.loggedIn = Auth.isLoggedIn();

    //uzmi informacije korisnika na ucitavanju strane
    Auth.getUser()
    .then(function(data){
      vm.user = data.data;
    });
  });

  //funkcija za logovanje
  vm.doLogin = function() {
    vm.processing = true;

    //ocisti error poruku
    vm.error = '';

    Auth.login(vm.loginData.username, vm.loginData.password)
      .success(function(data) {
        vm.processing = false;

        //ako je logovanje uspesno usmeri ga ka /users
        if (data.sucess)
          $location.path('/users');
        else {
          vm.error = data.message;
        }
      });
  };

  //funkcija za logout
  vm.doLogout = function() {
    Auth.logout();
    vm.user = '';
  };

  //funkcija za kreiranje admina
  vm.createAdmin = function(){
    Auth.createAdmin();
  };

});
