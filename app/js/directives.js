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

    /*
    .directive('postComments', ['desarrolloUyService', desarrolloUyService])
    function (desarrolloUyService) {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-comments.html',
        scope: {
          name: '@name'
        },
        link: function (scope, element, attributes) {
          attributes.$observe('name', function (value) {
            if (value) {
              scope.name = value
              scope.comments = pokemonService.getComments(value)
            }
          })
        },
        controller: function ($scope) {
          $scope.comments = pokemonService.getComments($scope.name)
          $scope.comment = {}
          $scope.show = false

          $scope.toggle = function () {
            $scope.show = !$scope.show
          }

          $scope.anonymousChanged = function () {
            if ($scope.comment.anonymous) {
              $scope.comment.email = ""
            }
          }

          $scope.addComment = function () {
            $scope.comment.date = Date.now()
            pokemonService.saveComment($scope.name, $scope.comment)
            $scope.comments = pokemonService.getComments($scope.name)
            $scope.comment = {}
          }

        }
      }
    }
    */

})()
