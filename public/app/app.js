angular.module('userApp', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userCtrl', 'userService'])

.config(function($httpProvider) {

	// zakaci interceptor na http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});
