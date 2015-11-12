angular.module('serviceAuth', [])

//AToken je factory definisan ispod
.factory('Auth', function($http, $q, AToken){
  var authFact = {};

  //metode dodate objektu za login, logout i da li je korisnik ulogovan (bol)

  authFact.login = function(username, password){
    return $http.post('/api/authenticate', {username: username, passord: password})
      .success(function(data){
        AToken.set(data.token);
        return data;
      });
  };

  authFact.logout = function(){
    AToken.set();
  };

  authFact.isLogged = function(){
    if(AToken.get())
      return true;
    else {
      return false;
    }
  };

});
