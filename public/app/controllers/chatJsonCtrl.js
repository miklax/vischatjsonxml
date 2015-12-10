// var app = angular.module('jsonCtrl', ['chatJsonService']);
var app = angular.module('chatJsonCtrl', [])

.controller('jsonController', function($rootScope, $scope, fsocket, DBHistory){

  var vm = this;
  vm.msgs = [];
  $('#chatWrap').scrollTop($('#chatWrap')[0].scrollHeight);

  //TODO ovde ucitati history
  DBHistory.doGetHistory()
  .success(function(data){
    vm.msgs = data;
  });

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
    $('#chatWrap').scrollTop($('#chatWrap')[0].scrollHeight);
  });


});
