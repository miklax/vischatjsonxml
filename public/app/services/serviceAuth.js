angular.module('serviceAuth', [])

//AToken je factory definisan ispod Auth factory
.factory('Auth', function($http, $q, AToken){
  var authFact = {};

  //metode dodate objektu za login, logout i da li je korisnik ulogovan (bol)

  //login i dodela tokena
  authFact.login = function(username, password){
    return $http.post('/api/authenticate', {username: username, passord: password})
      .success(function(data){
        AToken.setToken(data.token);
        return data;
      });
  };

  //logout i sklanja token
  authFact.logout = function(){
    AToken.setToken();
  };

  //proverava da li je korisnik ulogovan, tj da li postoji token
  authFact.isLogged = function(){
    if(AToken.getToken())
      return true;
    else {
      return false;
    }
  };

  //vrati ulogovanog koristnika
  authFact.getUser = function() {
    if(AToken.getToken())
      return $http.get('/api/me', {cache: true});
    else
      return $q.reject({message: 'No token found'});
  };

  //kreiraj admina za app
  authFact.createAdmin = function(){
    $http.post('/admincreate');
  };

  return authFact;
})

//factory AToken
.factory('AToken' , function($window){

  var ATokenFact = {};

  //postavi token u browser u localStorage
  ATokenFact.setToken = function(token){
    if(token)
      $window.localStorage.setItem('token', token);
    else {
      $window.localStorage.removeItem('token');
    }
  };

  //preuzmi token iz browsera iz localStorage
  AtokenFact.getToken = function(){
    return $window.localStorage.getItem('token');
  };
})

//prilikom svakog requesta koriscenje tokena
.factory('AuthIntercept' , function($q, $location, $AithToken){

  var interceptFact = {};

  interceptFact.request = function(config){

    //preuzima token
    var token  = AToken.getToken();
  };

  interceptFact.responseError = function(){};


});
