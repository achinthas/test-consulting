app.directive('backgroundPicker', function () {
  return {
    restrict: 'AE',

    scope: {
      dmBackgrounds: '=',
      dmBackgroundValue: '=',
    },

    template: '<label class="de-checkbox de-checkbox-image" ng-repeat="(k,v) in dmBackgrounds" >'+
                '<input class="custom-checkbox" type="checkbox" ng-model="v[\'checked\']" ng-change="selectBackground(k)">'+
                '<span class="custom-checkbox-image background dm-modal-background-list">'+
                  '<img ng-global="{{\'/images/upload/thumbnail/\'+v.path}}" alt="@{{name}}">'+
                '</span>'+
              '</label>',

    controller: ['$scope', function ($scope) {
      $scope.selectBackground = function (k) {
        for (var i = 0; i < $scope.dmBackgrounds.length; i++) {
          if (i !== k) {
            $scope.dmBackgrounds[i].checked = false;
          } else {
            $scope.dmBackgrounds[i].checked = true;
            $scope.dmBackgroundValue = $scope.dmBackgrounds[i].id;
          }
        }
      };
    }],
  };
});
