'use strict';

var app = angular.module('bookmarkApp', ["ui.router"]);

app.constant('API', {
  url: 'https://aleksey-nicholas-bookmarks.herokuapp.com'
});

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: "/",
    templateUrl: 'partials/home.html',
    controller: 'homeCtrl'
  }).state('tags', {
    url: "/tags",
    templateUrl: 'partials/tags.html',
    controller: 'tagsCtrl'
  }).state('tag', {
    url: "/tag/:id",
    templateUrl: 'partials/tag.html',
    controller: 'tagCtrl'
  }).state('edit', {
    url: "/link/:id",
    templateUrl: 'partials/edit.html',
    controller: 'editCtrl'
  }).state('new', {
    url: "/new",
    templateUrl: 'partials/new.html',
    controller: 'newCtrl'
  });
}]);

'use strict';

app.controller('homeCtrl', ['$scope', '$http', 'API', function ($scope, $http, API) {
  $scope.bookmarks = [];

  $http.get(API.url + '/links').then(function (res) {
    console.log('GET links successful:', res);
    $scope.bookmarks = res.data;
  }).catch(function (err) {
    console.error(err);
  });
}]);

'use strict';

app.controller('newCtrl', ['$scope', '$http', 'API', 'tagService', '$state', function ($scope, $http, API, tagService, $state) {

  $scope.submit = function () {
    console.log('$scope.titleInput:', $scope.titleInput);
    var title = $scope.titleInput;
    var url = $scope.urlInput;
    var tags = $scope.tagsInput.split(',').map(function (word) {
      return word.trim();
    });

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
    }).then(function (res) {
      console.log('success:', res);
      $state.go('home');
    }).catch(function (err) {
      console.error(err);
    });
  };
}]);

'use strict';

app.service('tagService', ['$http', 'API', function ($http, API) {

  this.initialized = false;
  this.tags = [];

  this.init = function (cb) {
    if (this.initialized === false) {
      self = this;
      $http.get(API.url + '/tags').then(function (res) {
        console.log('GET tags successful:', res);
        self.tags = res.data;
        self.initialized = true;
        cb(self.tags);
      }).catch(function (err) {
        console.error(err);
      });
    } else {
      cb(this.tags);
    }
  };

  this.findTag = function (id, cb) {
    this.init(function (tags) {
      for (var i = 0; i < tags.length; ++i) {
        if (tags[i]._id === id) {
          cb(tags[i]);
        }
      };
    });
  };

  this.findTagByName = function (name, cb) {
    this.init(function (tags) {
      for (var i = 0; i < tags.length; ++i) {
        if (tags[i].name === name) {
          cb(tags[i]);
        }
      };
    });
  };
}]);

'use strict';

app.controller('tagCtrl', ['$scope', '$stateParams', '$http', 'API', 'tagService', function ($scope, $stateParams, $http, API, tagService) {
  $scope.tag;

  $scope.init = function () {
    tagService.findTag($stateParams.id, function (tag) {
      $scope.tag = tag;
      console.log(tag);
      $scope.nameInput = tag.name;
    });
  };

  $scope.submit = function () {
    $scope.tag.name = $scope.nameInput;
    console.log('tag: ', $scope.tag);
    $http.put(API.url + '/tags', $scope.tag).then(function (res) {
      console.log('PUT tag successful:', res);
    }).catch(function (err) {
      console.error(err);
    });
  };
}]);

'use strict';

app.controller('tagsCtrl', ['$scope', '$http', 'API', 'tagService', '$state', function ($scope, $http, API, tagService, $state) {
  $scope.tags = [];

  $scope.init = function () {
    tagService.init(function (tags) {
      $scope.tags = tags;
    });
  };

  $scope.delete = function (id, index) {
    $http.delete(API.url + '/tags/' + id).then(function (res) {
      console.log('DELETE tag successful:', res);
      $scope.tags.splice(index, 1);
    }).catch(function (err) {
      console.error(err);
    });
  };

  $scope.edit = function (id) {
    $state.go('tag', { id: id });
  };
}]);