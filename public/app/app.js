angular.module('chatApp', [
	'ngAnimate',
	'app.routes',
	'authService',
	'mainCtrl',
	'userCtrl',
	'userService',
	'chatJsonCtrl',
	'jsonService',
	'scroll'
	// 'chatXmlCtrl',
	// 'xmlService'
])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});
