angular.module('testApp', ['./controllers/testCtrl'])

.controller('testAppCtrl', function(){
  var vm = this;

  vm.poruka = 'test';
});
