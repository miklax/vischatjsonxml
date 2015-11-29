angular.module('jsonService', [])

//kreiraj socket na klijentu
.factory('fsocket', function(){
  return io.connect('http://localhost:3000');
})

//za ucitavnje istorije
.factory('DBHistory', function($http){

  var chatFactory = {};

  chatFactory.doGetHistory = function(){
    return $http.get('/chat/chat');
  };

  return chatFactory;
});
