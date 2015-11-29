// var app = angular.module('jsonCtrl', ['chatJsonService']);
var app = angular.module('chatJsonCtrl', [])

.controller('jsonController', function($rootScope, $scope, fsocket){

  var vm = this;
  vm.msgs = [];

  //TODO ovde ucitati history

  vm.sndMsg = function(){
    fsocket.emit('send msg', {
      timeStamp: new Date(),
      username: $rootScope.gUsername,
      msgLine: vm.msgData.msgLine
    });
    vm.msgData.msgLine = '';
    console.log('sndMsg ok');
  };

  fsocket.on('get msg', function(dataObject) {
    vm.msgs.push(dataObject);
    $scope.$digest();
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
