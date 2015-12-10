angular.module('chatApp')
.directive('scrollDir', function(){
  console.log('directive init');
  return {
    restrict: 'A',
    scope: {
      scrollDir: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('scrollDir', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  };
});
