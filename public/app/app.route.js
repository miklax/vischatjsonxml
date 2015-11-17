angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider

  //home
  .when('/', {
    templateUrl: 'app/views/partials/home.html'
  })

  .when('/login', {
    templateUrl: 'app/views/partials/user/login.html',
    controller: 'mainController',
    controllerAs: 'main'
  })

  //korisnici
  .when('/users', {
    templateUrl: 'app/views/partials/user/all.html',
    controller: 'userController',
    controllerAs: 'user'
  })

  .when('/users/create', {
    templateUrl: 'app/views/partials/user/single.html',
    controller: 'userCreateController',
    controllerAs: 'user'
  })

  .when('/users/:user_id', {
    templateUrl: 'app/views/partials/user/single.html',
    controller: 'userEditController',
    controllerAs: 'user'
  });

  $locationProvider.html5Mode(true);
});
