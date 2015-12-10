angular.module('chatApp', [
	'ngAnimate',
	'app.routes',
	'authService',
	'mainCtrl',
	'userCtrl',
	'userService',
	'chatJsonCtrl',
	'jsonService',
])

.config(function($httpProvider) {

	// na svaki http request proveri token
	$httpProvider.interceptors.push('AuthInterceptor');

});
