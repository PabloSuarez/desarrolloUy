(function () {
  angular.module('desarrolloUy.services', [])
    .factory('githubService', ['$http', '$q', '$sessionStorage', function ($http, $q, $sessionStorage) {
      var _hostUrl = 'https://api.github.com/users/pablosuarez/repos'

      function listAll() {
        var deferred = $q.defer()

        if($sessionStorage[_hostUrl]){
          // paso a JSON
          var datos = JSON.parse($sessionStorage[_hostUrl])
          deferred.resolve(datos)
        }else{
          $http.get(_hostUrl)
            .success(function (data) {
              var datos = data
              // paso el objeto a string
              // console.log(datos)
              datos = JSON.stringify(datos)
              $sessionStorage[_hostUrl] = datos

              deferred.resolve(data)
            })
        }

        return deferred.promise
      }

      return {
        listAll: listAll
      }

    }])

})()
