angular.module('mainCtrl', [])

.controller('mainController', function($scope, $http, Auth){

  var vm = this;

  //proverava da li je korisnik ulogovan
  vm.loggedIn = Auth.isLoggedIn();

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
  vm.doLogin = function() {};

  //funkcija za logout
  vm.doLogout = function() {};

  //funkcija za kreiranje admina
  vm.createAdmin = function() {};

})
