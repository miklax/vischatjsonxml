angular.module('chatApp', [
	'ngAnimate',
	'app.routes',
	'authService',
	'mainCtrl',
	'userCtrl',
	'userService',
	'chatJsonCtrl',
	'jsonService',
<<<<<<< HEAD
=======
	'scroll'
	// 'chatXmlCtrl',
	// 'xmlService'
>>>>>>> d21e23e104d04595817812f3cc36ce72c9b2d388
])

.config(function($httpProvider) {

	// na svaki http request proveri token
	$httpProvider.interceptors.push('AuthInterceptor');

});
