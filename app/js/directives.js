(function () {

  angular.module('desarrolloUy.directives', [])

    .directive('headerMenu', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/header-menu.html'
      }
    })

    .directive('skillsSlider', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/skills-slider.html'
      }
    })

})()
