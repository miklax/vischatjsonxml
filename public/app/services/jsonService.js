angular.module('jsonService', [])
.factory('jsonFact', function($http){

  var chatFactory = {};

  chatFactory.doGetHistory = function(){
    return $http.get('/chat/chat');
  };

  chatFactory.doPostMsg = function(username, msgLine){

    return $http.post('/chat/chat', {
      username: username,
      msgLine: msgLine
    });
  };

  return chatFactory;

});
