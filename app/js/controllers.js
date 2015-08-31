(function () {

	angular.module('desarrolloUy.controllers', [])
		.controller('HomeController', ['$scope', HomeController])
		.controller('GithubController', ['$scope', 'githubService', GithubController])
		.controller('AboutController', ['$scope', AboutController])


	function HomeController($scope) {
		console.log('HOME controller LOG')
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

})()
