var app = angular.module('chatApp', ['ngAnimate', 'app.routes', 'serviceAuth', 'mainCtrl', 'userCtrl', 'userService'])

app.config(function($httpProvider) {

	alert('test main module');
	// zakaci interceptor na http requests
	$httpProvider.interceptors.push('AuthIntercept');

});
