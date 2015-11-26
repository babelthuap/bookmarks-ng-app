'use strict';

app.controller('tagsCtrl', ['$scope', '$http', 'API', function($scope, $http, API) {
  $scope.tags = [];

  $scope.init = function() {
    $http.get(API.url + '/tags')
    .then(function(res) {
      console.log('GET successful:', res)
      $scope.tags = res.data;
    })
    .catch(function(err) {
      console.error(err)
    });
  }

  $scope.delete = function(id, index) {
    $http.delete(API.url + '/tags', {_id: id})
    .then(function(res) {
      console.log('DELETE successful:', res);
      $scope.tags.splice(index, 1);
    })
    .catch(function(err) {
      console.error(err)
    });
  }

}]);
