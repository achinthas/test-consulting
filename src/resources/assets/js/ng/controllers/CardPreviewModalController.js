app.controller('CardPreviewModalController', function ($scope, dmSettings, dmAjax, dmConstants, dmJQuery) {

  $scope.currentCardId = null;

  $scope.isLoading = true;

  $scope.imagePath = dmSettings.uploads.original;

  $scope.recipesAvailable = false;

  $scope.$on('openCardPreviewModal', function (event, id) {
    $scope.isLoading = true;
    getCard(id);
  });
  $scope.recipes = [];

  function getCard(id) {
    dmAjax.call({
      method: 'GET',
      url: dmSettings.card.list + '/' + id,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, listSuccess, listError, 'media');
  }
  var today = moment(new Date()).format("YYYY-MM-DD");
  var listSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.currentCard = response.data.data.card[0];
      if (typeof (response.data.data.recipes) == 'object' && Object.keys(response.data.data.recipes).length) {
        $scope.recipes = response.data.data.recipes[Object.keys(response.data.data.recipes)[0]];
        if ($scope.recipes.length) {
          $scope.recipesAvailable = true;
        } else {
          $scope.recipesAvailable = false;
          $scope.noRecipesAvailable = "No Recipes Found";
        }
      } else {
        $scope.recipes = [];
        $scope.recipesAvailable = false;
        $scope.noRecipesAvailable = "No Recipes Found";
      }
    }
    $scope.isLoading = false;
  }

  var isArray = function (value) {
    return value && typeof value === 'object' && value.constructor === Array;
  }

  var listError = function (response) {
    unknownError();
    $scope.isLoading = false;
  }

  var unknownError = function () {
    dmJQuery.hideModal('#previewCardModal');
    dmJQuery.messageBox(dmConstants.errorMessage.common, 'message', 'danger');
  }

});