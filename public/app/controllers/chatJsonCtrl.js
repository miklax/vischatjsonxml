// var app = angular.module('jsonCtrl', ['chatJsonService']);
var app = angular.module('chatJsonCtrl', []);

app.controller('jsonController', function($rootScope, jsonFact){

  var vm = this;
  console.log('json controller loaded');

  jsonFact.doGetHistory()
  .success(function(data){
    vm.historyData = data;
    console.log(data);
    console.log($rootScope.gUsername);
  });

  vm.postMsg = function(){

    //ako je prazno polje ne trigeruje f()
    // if (vm.msgData.msg !== undefined) {
      jsonFact.doPostMsg($rootScope.gUsername, vm.msgData.msgLine)
      .success(function(data){
        vm.msgData.msgLine = '';          //ocisti formu
        vm.historyData = data;    //osvezi podatke na svakom slanju poruke
        vm.$digest();
      });
    // }
  };

});
