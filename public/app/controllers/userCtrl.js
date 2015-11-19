angular.module('userCtrl', ['userService'])

.controller('userController', function(User) {

	var vm = this;
	vm.processing = true;

	// svi korisnici prilikom ucitavanja strane
		User.all()
		.success(function(data) {

			vm.processing = false;

			// binduj korisnika
			vm.users = data;
		});

	// Brisanje korisnika
	vm.deleteUser = function(id) {
		vm.processing = true;

		User.delete(id)
			.success(function(data) {

				User.all()
					.success(function(data) {
						vm.processing = false;
						vm.users = data;
					});

			});
	};

})

//kreiranje korisnika
.controller('userCreateController', function(User) {

	var vm = this;

	//mod u kome se radi na single.html
	vm.type = 'create';

	// kreiranje korisnika
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

// Editovanje korisnika
.controller('userEditController', function($routeParams, User) {

	var vm = this;

	//mod za single.html
	vm.type = 'edit';

	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
		});

	// snimi korisnika
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// update
		User.update($routeParams.user_id, vm.userData)
			.success(function(data) {
				vm.processing = false;

				// resetuj formu
				vm.userData = {};

				// bindovanje od servera
				vm.message = data.message;
			});
	};
});
