angular.module('chatApp', ['ngAnimate', 'app.routes', 'serviceAuth', 'mainCtrl', 'userCtrl', 'userService'])

.config(function($httpProvider) {

	// zakaci interceptor na http requests
	$httpProvider.interceptors.push('AuthIntercept');

});
