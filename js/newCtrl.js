'use strict';

app.controller('newCtrl', ['$scope', '$http', function($scope, $http) {
  var apiUrl = 'https://aleksey-nicholas-bookmarks.herokuapp.com/links'

  $scope.submit = function() {
    console.log('$scope.titleInput:', $scope.titleInput)
    var title = $scope.titleInput;
    var url = $scope.urlInput;
    var tags = $scope.tagsInput;

    $http.post(apiUrl, {'title': title, 'url': url})
    .then(function(res) {
      console.log('success:', res)
    })
    .catch(function(err) {
      console.error(err)
    });
  }

}]);
