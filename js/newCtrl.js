'use strict';

app.controller('newCtrl', ['$scope', '$http', 'API', 'tagService', '$state', function($scope, $http, API, tagService, $state) {

  $scope.submit = function() {
    console.log('$scope.titleInput:', $scope.titleInput)
    var title = $scope.titleInput;
    var url = $scope.urlInput;
    var tags = $scope.tagsInput.split(',').map(function(word) {
      return word.trim();
    })

    // // get ids for tags we do have AND tags we don't have (create new tags)

    // for (var i = 0; i < tags.length; ++i) {
    //   tagService.findTagByName(tags[i], function(tag) {
    //     console.log('tag:', tag)
    //   })
    // };


    $http.post(API.url + '/links', {
      'title': title,
      'url': url,
      'tags': tags
    })
    .then(function(res) {
      console.log('success:', res)
      $state.go('home');
    })
    .catch(function(err) {
      console.error(err)
    });
  }

}]);
