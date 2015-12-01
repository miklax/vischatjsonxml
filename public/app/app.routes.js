angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})

		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    			controllerAs: 'login'
		})

		// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})

		// Kreiranje novog korisnika
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})

		// Json Chat
		.when('/chat/jsonchat', {
			templateUrl: 'app/views/pages/jsonchat.html',
			controller: 'jsonController',
			controllerAs: 'jchat'
		})

		//xmlchat
		.when('/chat/xmlchat', {
			templateUrl: 'app/views/pages/xmlchat.html',
			controller: 'xmlController',
			controllerAs: 'xchat'
		});

	$locationProvider.html5Mode(true);

});
