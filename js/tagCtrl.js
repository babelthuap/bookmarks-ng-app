'use strict';

app.controller('tagCtrl', ['$scope', '$stateParams', '$http', 'API', 'tagService', function($scope, $stateParams, $http, API, tagService) {
  $scope.tag;

  $scope.init = function() {
    tagService.findTag($stateParams.id, function(tag) {
      $scope.tag = tag;
      console.log(tag);
      $scope.nameInput = tag.name;
    });
  }

  $scope.submit = function() {
    $scope.tag.name = $scope.nameInput;
    console.log('tag: ', $scope.tag);
    $http.put(API.url + '/tags', $scope.tag)
    .then(function(res) {
      console.log('PUT tag successful:', res);
    })
    .catch(function(err) {
      console.error(err)
    });
  }

}]);
