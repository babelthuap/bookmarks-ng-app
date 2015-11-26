'use strict';

app.controller('tagsCtrl', ['$scope', '$http', 'API', 'tagService', '$state', function($scope, $http, API, tagService, $state) {
  $scope.tags = [];

  $scope.init = function() {
    tagService.init(function(tags) {
      $scope.tags = tags;
    });
  }

  $scope.delete = function(id, index) {
    $http.delete(API.url + '/tags/' + id)
      .then(function(res) {
        console.log('DELETE tag successful:', res);
        $scope.tags.splice(index, 1);
      })
      .catch(function(err) {
        console.error(err)
      });
  }

  $scope.edit = function(id) {
    $state.go('tag', { id: id });
  }

}]);
