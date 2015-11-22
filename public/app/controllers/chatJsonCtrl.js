angular.module('jsonCtrl' ['chatJsonService'])
.controller('jsonController', function(jsonFact){

  var vm = this;

  jsonFact.doGetHistory()
  .success(function(data){
    vm.historyData = data;
  });

  //salje username, timestamp i poruku
  jsonFact.doPostMsg(function(){

  });
});
