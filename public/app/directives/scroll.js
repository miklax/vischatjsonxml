angular.module('scroll', [])
.directive('scrollDir', function(){
  console.log('directive init');
  return {
    restrict: 'A',
    scope: {
      scrollBottomChat: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('scrollBottomChat', function (newValue) {
        if (newValue){
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  };
});
