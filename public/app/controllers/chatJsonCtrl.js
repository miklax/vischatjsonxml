// var app = angular.module('jsonCtrl', ['chatJsonService']);
var app = angular.module('chatJsonCtrl', []);

app.controller('jsonController', function(jsonFact){

  var vm = this;
  console.log('json controller loaded');

  jsonFact.doGetHistory()
  .success(function(data){
    vm.historyData = data;
    console.log(data);
  });

  vm.postMsg = function(){
    jsonFact.doPostMsg(vm.historyData.username, msg)
  };

  // //salje username, timestamp i poruku
  // jsonFact.doPostMsg(function(){
  //
  // });
});
