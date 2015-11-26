'use strict';

app.controller('newCtrl', ['$scope', '$http', 'API', function($scope, $http, API) {
  $scope.submit = function() {
    console.log('$scope.titleInput:', $scope.titleInput)
    var title = $scope.titleInput;
    var url = $scope.urlInput;
    var tags = $scope.tagsInput;

    $http.post(API.url + '/links', {'title': title, 'url': url})
    .then(function(res) {
      console.log('success:', res)
    })
    .catch(function(err) {
      console.error(err)
    });
  }

}]);
