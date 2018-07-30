app.controller('CardEditModalController', function ($scope, dmSettings, dmAjax, dmConstants, dmJQuery) {

  $scope.backgrounds = [];

  $scope.cards = [];

  $scope.currentCard = null;

  $scope.selectedBackground;

  $scope.isSubmitted = false;

  $scope.isLoading = true;

  $scope.$on('openCardEditModal', function (event, id) {
    $scope.isLoading = true;
    $scope.isSubmitted = false;
    $scope.currentMenuId = id;
    getCard(id);
    resetAll();
  });

  $scope.deleteCard = function () {
    if ($scope.currentCard) {
      dmJQuery.hideModal('#editCardModal');
      $scope.$parent.deleteCard($scope.currentCard.id);
    }
  }

  function getCard(id) {
    dmAjax.call({
      method: 'GET',
      url: dmSettings.card.list + '/' + id,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, listSuccess, listError, 'media');
  }
  var listSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.cards = response.data.data.card;
      $scope.currentCard = response.data.data.card[0];
      $scope.selectedMenu = $scope.currentCard;
      $scope.backgrounds = response.data.static.media;
      $scope.cardTitle = $scope.currentCard.card_name;
      $scope.cardCustomText = $scope.currentCard.custom_text;
      if ($scope.backgrounds.length) {
        $scope.selectedBackground = $scope.currentCard.media_id;
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

  $scope.saveCard = function () {
    $scope.isSubmitted = true;
    if ($scope.validateSubmit()) {
      dmAjax.call({
        method: 'PUT',
        data: updateCard(),
        url: dmSettings.card.list + '/' + $scope.currentCard.id,
        timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
      }, cardSaveSuccess, cardSaveError);
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

  var cardSaveSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.$parent.updateCardList();
      dmJQuery.hideModal('#editCardModal');
      dmJQuery.messageBox(response.data.message, 'message', 'success');
    }
  }

  var cardSaveError = function (response) {
    dmJQuery.messageBox(response.data.message, 'message', 'danger');
  }

  var updateCard = function (response) {
    var card = {
      card_name: $scope.cardTitle,
      custom_text: $scope.cardCustomText,
      dashboard_id: 1,
      menu_id: $scope.selectedMenu.menu_id,
      media_ids: [$scope.selectedBackground],
    };
    return card;
  }

  var unknownError = function () {
    dmJQuery.hideModal('#editCardModal');
    dmJQuery.messageBox(dmConstants.errorMessage.common, 'message', 'danger');
    $scope.updateCardList();
  }

  var resetAll = function () {
    $scope.selectedMenu = null;
    $scope.cardTitle = null;
    $scope.cardCustomText = null;
  }

});