// var app = angular.module('jsonCtrl', ['chatJsonService']);
var app = angular.module('chatJsonCtrl', [])

.controller('jsonController', function(fsocket){

  var vm = this;
  vm.msgs = [];

  vm.sndMsg = function(){
    fsocket.emit('send msg', vm.msgData.msgLine);
    vm.msgData.msgLine = '';
  };

  fsocket.on('get msg', function(data) {
    vm.msgs.push(data);
    vm.$digest();
  });

  // console.log('json controller loaded');
  //
  // jsonFact.doGetHistory()
  // .success(function(data){
  //   vm.historyData = data;
  //   console.log(data);
  //   console.log($rootScope.gUsername);
  // });
  //
  // vm.postMsg = function(){
  //
  //   //ako je prazno polje ne trigeruje f()
  //   // if (vm.msgData.msg !== undefined) {
  //     jsonFact.doPostMsg($rootScope.gUsername, vm.msgData.msgLine)
  //     .success(function(data){
  //       vm.msgData.msgLine = '';          //ocisti formu
  //       vm.historyData = data;    //osvezi podatke na svakom slanju poruke
  //       vm.$digest();
  //     });
  //   // }
  // };

});
