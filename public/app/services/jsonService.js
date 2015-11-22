angular.module('chatJsonService', [])
.factory('jsonFact', function($http){

  var chatFactory = {};

  chatFactory.doGetHistory = function(){
    return $http.get('/jsonchat/chat');
  };

  chatFactory.doPostMsg = function(username, msgData){

    return $http.post('/jsonchat/chat', {
      username: username,
      msgData: msgData
    });
  };

  return chatFactory;

});
