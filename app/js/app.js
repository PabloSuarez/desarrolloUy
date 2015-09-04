(function () {
  var angular = require('angular'),
      controllers = require('./controllers'),
      directives = require('./directives')
      filters = require('./filters'),
      services = require('./services'),
      ngStorage = require('ngstorage')

  require('angular-router-browserify')(angular)

  angular.module('desarrolloUy', [
    'ngRoute',
    'ngStorage',
    'desarrolloUy.controllers',
    'desarrolloUy.directives',
    'desarrolloUy.services'
    // 'desarrolloUy.filters'
  ])

  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/github/', {
        templateUrl: 'views/github.html',
        controller: 'GithubController'
      })
      .when('/info/', {
        templateUrl: 'views/info.html',
        controller: 'AboutController'
      })
      .otherwise({
        redirectTo: '/'
      })

  }])

})()
