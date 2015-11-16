angular.module('userCtrl', ['userService'])

.controller('userController', function(User) {

	var vm = this;

	// za prikaz LOADING...
	vm.processing = true;

	// pokupi sve korisnike na ucitavanju
	User.all()
		.success(function(data) {

			// skloni LOADING...
			vm.processing = false;

			// bind the users that come back to vm.users
			vm.users = data;
		});

	// brisanje korisnika
	vm.deleteUser = function(id) {
		vm.processing = true;

		User.delete(id)
			.success(function(data) {

        //nakon sto obrise API vrati novu listu podataka u data
				User.all()
					.success(function(data) {
						vm.processing = false;
						vm.users = data;
					});

			});
	};
})

// Kontroler za stranu za kreiranje korisnika
.controller('userCreateController', function(User) {

	var vm = this;
	vm.type = 'create';

	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		User.create(vm.userData)
			.success(function(data) {
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
			});
	};
})

// Kontroler za stranu za editovanje korisnika
.controller('userEditController', function($routeParams, User) {

	var vm = this;
	vm.type = 'edit';

	// da bi se pokupio iz URL-a koristi se $routeParams
	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
		});

	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		User.update($routeParams.user_id, vm.userData)
			.success(function(data) {
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
			});
	};
});
