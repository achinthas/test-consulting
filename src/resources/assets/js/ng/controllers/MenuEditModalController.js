app.controller('MenuEditModalController', function ($scope, dmSettings, dmAjax, dmConstants, dmJQuery) {


  $scope.selectedMenu;

  $scope.avetars = [];

  $scope.selectedAvater;

  $scope.hmpMenus = [];

  $scope.isLoading = true;

  $scope.$on('openMenuEditModal', function (event, id) {
    getMenu(id);
  });

  function getMenu (id) {
    dmAjax.call({
      method: 'GET',
      url: dmSettings.menu.list+'/'+id,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, menuSuccess, menuError,'avatar');
  }

  $scope.deleteMenu = function () {
    if ($scope.selectedMenu) {
      dmJQuery.hideModal('#editMenuModal');
      $scope.$parent.deleteMenu($scope.selectedMenu.id);
    }
  }

  var menuSuccess = function (response){
    if (response && response.status && response.status === 200) {
      $scope.hmpMenus = response.data.data;
      $scope.selectedMenu = response.data.data[0];
      $scope.avetars = response.data.static.avatar;
      $scope.selectedAvater = $scope.selectedMenu.avatar_id;
      selectAvatar($scope.selectedAvater);
    }
    $scope.isLoading = false;
  }

  var menuError = function (response) {
    $scope.isLoading = false;
    dmJQuery.hideModal('#editMenuModal');
    dmJQuery.messageBox(dmConstants.errorMessage.common, 'message', 'danger');
  }

  var selectAvatar = function(id) {
    for (var i = 0; i < $scope.avetars.length; i++) {
      if ($scope.avetars[i].id === $scope.selectedAvater) {
        $scope.avetars[i].checked = true;
        return;
      }
    }
    return;
  }
  
  $scope.saveMenu = function () {
    dmAjax.call({
      method: 'PUT',
      data: { avatar_id: $scope.selectedAvater },
      url: dmSettings.menu.list + '/' + $scope.selectedMenu.id,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, menuSaveSuccess, menuSaveError, 'avatar');
  }

  var menuSaveSuccess = function (response) {
    dmJQuery.hideModal('#editMenuModal');
    $scope.$parent.updateMenuList();
    dmJQuery.messageBox(response.data.message, 'message', 'success');
  }

  var menuSaveError = function (response) {
    dmJQuery.hideModal('#editMenuModal');
    dmJQuery.messageBox(dmConstants.errorMessage.common, 'message', 'danger');
  }

  var updatedMenu = function (response) {
    var menu = $scope.selectedMenu;
    menu.avatar_id = $scope.selectedAvater;
    return menu;
  }


});