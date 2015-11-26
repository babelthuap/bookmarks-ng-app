'use strict';

var app = angular.module('bookmarkApp', ["ui.router"])

app.constant('API', {
  url: 'https://aleksey-nicholas-bookmarks.herokuapp.com'
})

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/")
  
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    })
    .state('tags', {
      url: "/tags",
      templateUrl: 'partials/tags.html',
      controller: 'tagsCtrl'
    })
    .state('tag', {
      url: "/tag/:id",
      templateUrl: 'partials/tag.html',
      controller: 'tagCtrl'
    })
    .state('edit', {
      url: "/link/:id",
      templateUrl: 'partials/edit.html',
      controller: 'editCtrl'
    })
    .state('new', {
      url: "/new",
      templateUrl: 'partials/new.html',
      controller: 'newCtrl'
    })
}]);
