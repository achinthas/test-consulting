app.controller('CardAddModalController', function ($scope, dmSettings, dmAjax, dmConstants, dmJQuery) {

  $scope.backgrounds = [];

  $scope.menus = [];

  $scope.selectedBackground;

  $scope.isSubmitted = false;

  $scope.isLoading = true;

  $scope.$on('openCardAddModal', function (event) {
    $scope.isLoading = true;
    $scope.isSubmitted = false;
    getMenus();
    resetAll();
  });

  function getMenus() {
    dmAjax.call({
      method: 'GET',
      url: dmSettings.menu.list,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, listSuccess, listError, 'media');
  }
  var listSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.menus = response.data.data.data;
      $scope.backgrounds = response.data.static.media;
      if ($scope.backgrounds.length){
        $scope.selectedBackground = $scope.backgrounds[0].id;
        selectBackground($scope.selectedBackground);
      }
    }
    $scope.isLoading = false;
  }
  
  var listError = function (response) {
    unknownError();
    $scope.isLoading = false;
  }

  var selectBackground = function (id) {
    for (var i = 0; i < $scope.backgrounds.length; i++) {
      if ($scope.backgrounds[i].id === id) {
        $scope.backgrounds[i].checked = true;
        return;
      }
    }
    return;
  }

  $scope.addCard = function () {
    $scope.isSubmitted = true;
    if ($scope.validateSubmit()) {
      dmAjax.call({
        method: 'POST',
        data: createCard(),
        url: dmSettings.card.list,
        timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
      }, menuSaveSuccess, menuSaveError);
    }
  }

  $scope.validateSubmit = function () {
    if (!$scope.selectedBackground) {
      return false;
    } else if (!$scope.selectedMenu) {
      return false;
    } else if (!$scope.cardTitle) {
        return false;
    } else if ($scope.cardTitle.length > 255){
        return false;
    } else if (!$scope.cardCustomText) {
      return false;
    }
    return true;
  }

  var menuSaveSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.$parent.updateCardList();
      dmJQuery.hideModal('#addCardModal');
      dmJQuery.messageBox(response.data.message, 'message', 'success');
    }
  }

  var menuSaveError = function (response) {
    dmJQuery.messageBox(response.data.message, 'message', 'danger');
  }

  var createCard = function (response) {
    var card = {
      card_name: $scope.cardTitle,
      custom_text: $scope.cardCustomText,
      dashboard_id: 1,
      menu_id: $scope.selectedMenu.id,
      media_ids: [$scope.selectedBackground],
    };
    return card;
  }

  var unknownError = function () {
    dmJQuery.hideModal('#addCardModal');
    dmJQuery.messageBox(dmConstants.errorMessage.common, 'message', 'danger');
    $scope.updateCardList();
  }

  var resetAll = function (){
    $scope.selectedMenu = null;
    $scope.cardTitle = null;
    $scope.cardCustomText = null;
  }

});