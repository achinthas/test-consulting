app.directive('avatarPicker', function () {
  return {
    restrict: 'AE',

    scope: {
      dmAvatars: '=',
      dmAvatarValue: '=',
    },

    template: '<label class="de-checkbox de-checkbox-image" ng-repeat="(k,v) in dmAvatars" >'+
                '<input class="custom-checkbox" type="checkbox" ng-model="v[\'checked\']" ng-change="selectAvatar(k)">'+
                '<span class="custom-checkbox-image avatar dm-modal-avatar-list">'+
                  '<img ng-global="{{\'/images/avatar/\'+v.avatar}}" alt="@{{avatar_name}}">'+
                '</span>'+
              '</label>',

    controller: ['$scope', function ($scope) {
      $scope.selectAvatar = function (k) {
        for (var i = 0; i < $scope.dmAvatars.length; i++) {
          if (i !== k) {
            $scope.dmAvatars[i].checked = false;
          } else {
            $scope.dmAvatars[i].checked = true;
            $scope.dmAvatarValue = $scope.dmAvatars[i].id;
          }
        }
      };
    }],
  };
});
