angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth) {

	var vm = this;
	vm.loggedIn = Auth.isLoggedIn();

	// na svakom req proverava da li je user ulogovan
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();

		// user info
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});
	});

	// login
	vm.doLogin = function() {
		vm.processing = true;

		// obrisi gresku
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;

				// ako je sve ok prebaci korisnika
				if (data.success)
					$location.path('/');
				else
					vm.error = data.message;

			});
	};

	// Logout
	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';

		$location.path('/login');
	};

	vm.createSample = function() {
		Auth.createSampleUser();
	};

});
