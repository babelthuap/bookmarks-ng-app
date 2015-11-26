'use strict';

app.controller('homeCtrl', ['$scope', '$http', 'API', function($scope, $http, API) {
  $scope.bookmarks = [];

  $http.get(API.url + '/links')
  .then(function(res) {
    console.log('GET links successful:', res)
    $scope.bookmarks = res.data;
  })
  .catch(function(err) {
    console.error(err)
  });

}]);
