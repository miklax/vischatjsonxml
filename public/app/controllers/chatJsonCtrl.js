// var app = angular.module('jsonCtrl', ['chatJsonService']);
var app = angular.module('chatJsonCtrl', []);

app.controller('jsonController', function(jsonFact){

  var vm = this;
  console.log('json controller loaded');

///////mora u konstruktor, resi ovo kada se naspavas :D
  vm.getHistory = function(){
    jsonFact.doGetHistory()
    .success(function(data){
      vm.historyData = data;
      console.log(data);
    });
  };


  // //salje username, timestamp i poruku
  // jsonFact.doPostMsg(function(){
  //
  // });
});
