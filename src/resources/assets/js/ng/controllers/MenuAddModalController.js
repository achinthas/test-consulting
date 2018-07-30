app.controller('MenuAddModalController', function ($scope, dmSettings, dmAjax, dmConstants, dmJQuery) {

  $scope.avetars = [];

  $scope.hmpMenus = [];

  $scope.selectedAvater;

  $scope.isSubmitted = false;

  $scope.isLoading = true;

  $scope.$on('openMenuAddModal', function (event, id) {
    $scope.isLoading = true;
    $scope.isSubmitted = false;
    $scope.selectedHMPMenu = null;
    getMenu(id);
  });

  function getMenu(id) {
    dmAjax.call({
      method: 'GET',
      url: dmSettings.menu.list,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, menuSuccess, menuError, 'avatar, healthEMenus');
  }

  var menuSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.avetars = response.data.static.avatar;
      if (response.data.static.healthEMenus) { 
        $scope.hmpMenus = response.data.static.healthEMenus.menus;
      }
      if ($scope.avetars && $scope.avetars[0]) {
        $scope.selectedAvater = $scope.avetars[0].id;
      }
      selectAvatar($scope.selectedAvater);
    }
    $scope.isLoading = false;
  }

  var menuError = function (response) {
    unknownError();
    $scope.isLoading = false;
  }

  var selectAvatar = function (id) {
    for (var i = 0; i < $scope.avetars.length; i++) {
      if ($scope.avetars[i].id === $scope.selectedAvater) {
        $scope.avetars[i].checked = true;
        return;
      }
    }
    return;
  }

  $scope.addMenu = function () {
    $scope.isSubmitted = true;
    if ($scope.validateSubmit()) {
      dmAjax.call({
        method: 'POST',
        data: updatedMenu(),
        url: dmSettings.menu.list,
        timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
      }, menuSaveSuccess, menuSaveError, 'avatar', 'healthEMenus');
    }
  }

  $scope.validateSubmit = function(){
    if (!$scope.selectedHMPMenu) {
      return false;
    } else if (!$scope.selectedAvater) {
      return false;
    }
    return true;
  }

  $scope.menuChanged = function () {
    $scope.isDublicateItem = false;
  }

  var menuSaveSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.$parent.updateMenuList();
      dmJQuery.hideModal('#addMenuModal');
      dmJQuery.messageBox(response.data.message, 'message', 'success');
    }
  }

  var menuSaveError = function (response) {
    if (response.status == 409) {
      $scope.isDublicateItem = true;
      $scope.errorMessage = response.data.message;
    } else {
      unknownError();
    }
  }

  var updatedMenu = function (response) {
    var menu = {
      dashboard_id: 1,
      hmp_menu_id: $scope.selectedHMPMenu.hmp_menu_id,
      menu_title: $scope.selectedHMPMenu.menu_title,
      start_date: $scope.selectedHMPMenu.start_date,
      end_date: $scope.selectedHMPMenu.end_date,
      avatar_id: $scope.selectedAvater,
    };
    return menu;
  }

  var unknownError = function () {
    dmJQuery.hideModal('#addMenuModal');
    dmJQuery.messageBox(dmConstants.errorMessage.common, 'message', 'danger');
    $scope.$parent.updateMenuList();
  }

});