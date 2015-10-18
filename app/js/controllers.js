(function () {

	angular.module('desarrolloUy.controllers', [])
		.controller('HomeController', ['$scope', HomeController])
		.controller('GithubController', ['$scope', 'githubService', GithubController])
		.controller('AboutController', ['$scope', AboutController])
		.controller('menuController', ['$scope', menuController])

	function HomeController($scope) {
	}

	function GithubController($scope, githubService) {
		$scope.repositories = []
		githubService.listAll()
			.then(function (data) {
				$scope.repositories = data
			})
	}

	function AboutController($scope) {
	}

	function menuController($scope) {
		$scope.showMenu = false
	}

})()
