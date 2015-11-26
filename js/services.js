'use strict';

app.service('tagService', ['$http', 'API', function($http, API) {

  this.initialized = false;
  this.tags = [];

  this.init = function(cb) {
    if (this.initialized === false) {
      self = this;
      $http.get(API.url + '/tags')
        .then(function(res) {
          console.log('GET tags successful:', res)
          self.tags = res.data;
          self.initialized = true;
          cb(self.tags);
        })
        .catch(function(err) {
          console.error(err)
        });
    } else {
      cb(this.tags);
    }
  }

  this.findTag = function(id, cb) {
    this.init(function(tags) {
      for (var i = 0; i < tags.length; ++i) {
        if (tags[i]._id === id) {
          cb(tags[i]);
        }
      };
    });
  }

  this.findTagByName = function(name, cb) {
    this.init(function(tags) {
      for (var i = 0; i < tags.length; ++i) {
        if (tags[i].name === name) {
          cb(tags[i]);
        }
      };
    });
  }

}]);
