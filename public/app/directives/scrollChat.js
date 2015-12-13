angular.module('chatApp')
.directive('scrollDir', function(){
  console.log('directive init');
  return {
    restrict: 'A',
    scope: {
      scrollDir: "="
    },
    link: function (scope, element) {
          //$watchCollection - prati promene u array i u callback registruje promenu
          scope.$watchCollection('scrollDir', function (newMsg) {
            if (newMsg)
            {
              $(element).scrollTop($(element)[0].scrollHeight);
            }
          });
        }
    };

});
