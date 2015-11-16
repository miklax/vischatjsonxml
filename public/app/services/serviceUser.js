angular.module('userService', [])

.factory('User', function($http) {

	var userFactory = {};

	// GET korisnika
	userFactory.get = function(id) {
		return $http.get('/api/users/' + id);
	};

	// GET sve korisnike
	userFactory.all = function() {
		return $http.get('/api/users/');
	};

	// POST kreiraj korisnika
	userFactory.create = function(userData) {
		return $http.post('/api/users/', userData);
	};

	// PUT izmeni korisnika
	userFactory.update = function(id, userData) {
		return $http.put('/api/users/' + id, userData);
	};

	// DELETE korisnika
	userFactory.delete = function(id) {
		return $http.delete('/api/users/' + id);
	};

	return userFactory;
  //git bug
});
