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

  $scope.edit = function(tag) {
    console.log(event.target);
    var $org = $(event.target);
    var $fld = $('<input class="fld">');
    $fld.val(tag.name);
    $fld.width($org.width());
    $fld.height($org.height());

    var paddingTop = parseFloat($org.css('padding-top'));
    var paddingLeft = parseFloat($org.css('padding-left'));

    var pos = $org.position();
    $fld.css('top', pos.top + paddingTop);
    $fld.css('left', pos.left + paddingLeft);

    $org.append($fld);
    $fld.focus();
    $fld.select();
  }

  $scope.key = function() {
    console.log(event.which);
    if (event.which === 13) {
      var newval = $(event.target).val();
      $(event.target).parent().text(newval + ', ');



      $(event.target).remove();
      console.log(newval);
    }
    else if (event.which === 27) {
      $(event.target).remove();
    }
  }

}]);
