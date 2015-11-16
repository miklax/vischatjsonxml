angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider

  //home
  .when('/', {
    templateUrl: 'app/views/page/home.html'
  })

  .when('/login', {
    templateUrl: 'app/views/page/login.html',
    controller: 'mainController',
    controllerAs: 'main'
  })

  .when('/users', {
    templateUrl: 'app/views/pages/users/all.html',
    controller: 'userController',
    controllerAs: 'user'
  })

  .when('/users/create', {
    templateUrl: 'app/views/pages/users/single.html',
    controller: 'userCreateController',
    controllerAs: 'user'
  })

  .when('/users/:user_id', {
    templateUrl: 'app/views/pages/users/single.html',
    controller: 'userEditController',
    controllerAs: 'user'
  });

  $locationProvider.html5Mode(true);
});
