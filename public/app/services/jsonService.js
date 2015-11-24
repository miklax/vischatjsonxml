angular.module('jsonService', [])
.factory('jsonFact', function($http){

  var chatFactory = {};

  chatFactory.doGetHistory = function(){
    return $http.get('/chat/chat');
  };

  chatFactory.doPostMsg = function(username, msgData){

    return $http.post('/chat/chat', {
      username: username,
      msgData: msgData
    });
  };

  return chatFactory;

});
