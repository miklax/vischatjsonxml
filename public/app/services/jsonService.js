angular.module('chatJsonService', [])
.factory('jsonFact', function($http){

  var chatFactory = {};

  chatFactory.doGetHistory = function(){
    return $http.get('/jsonchat/chat');
  };

  chatFactory.doPostMsg = function(msgData){
    return $http.post('/jsonchat/chat', msgData);
  };

  return chatFactory;

});
