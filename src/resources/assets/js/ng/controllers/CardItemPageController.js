app.controller('CardItemController', function ($scope, $location, $window, dmSettings, dmAjax, dmConstants, dmCard, dmJQuery) {

  $scope.isLoading = true;
  $scope.guid = $window.Data.guid ? $window.Data.guid : '';
  $scope.cardId = $window.Data.cardId ? $window.Data.cardId : '';
  $scope.menu = null;
  $scope.RecipeCategory = [];

  $scope.ItemStatus = {
    0: { id: 0, status_type: "Selected Items", status: true},
    1: { id: 1, status_type: "Unselected Items", status: false},
  };

  //Search
  $scope.searchQuery = $location.search().query ? $location.search().query : "";
  $scope.selectedCategoryId = $location.search().recipe_category ? $location.search().recipe_category : "";
  $scope.selectedItemStatusId = $location.search().status ? $location.search().status : null;
  $scope.selectedItemStatus = $scope.ItemStatus[$scope.selectedItemStatusId] ? $scope.ItemStatus[$scope.selectedItemStatusId] : null;

  $scope.clearFilters = function () {
    $scope.searchQuery = "";
    $scope.selectedCategory = null;
    $scope.selectedItemStatus = null;
    $scope.search();
  }

  $scope.onSearch = function (recipe){
    var query = $scope.searchQuery.toLowerCase();
    recipe.recipe_name = recipe.recipe_name.toLowerCase();
    var isMatch = true;
    if (query != '' && (recipe.recipe_name.search(query) < 0)){
      isMatch = false;
    }
    if ($scope.selectedCategory && (recipe.category !== $scope.selectedCategory.category_name)) {
      isMatch = false;
    }
    if ($scope.selectedCategory && (recipe.category !== $scope.selectedCategory.category_name)) {
      isMatch = false;
    }
    if ($scope.selectedItemStatus && (recipe.status !== $scope.selectedItemStatus.status)) {
      isMatch = false;
    }
    return isMatch;
  }

  $scope.search = function (a) {
    $location.search({
      query: $scope.searchQuery,
      recipe_category: $scope.selectedCategory ? $scope.selectedCategory.id : "",
      status: $scope.selectedItemStatus ? $scope.selectedItemStatus.id : "",
    });
  }

  //Update Page
  var listError = function (response) {
    dmJQuery.messageBox(response.data.message, 'message', 'danger');
  }

  //Initiate page
  $scope.init = function () {
    getCardItems();
  };

  var getCardItems = function () {
    dmAjax.call({
      method: 'GET',
      url: '/api/' + $scope.cardId +'/card-item',
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, ListSuccess, listError, 'RecipeCategory');
  }

  var selectCategory = function (id) {
    for (var i = 0; i < $scope.RecipeCategory.length; i++) {
      if ($scope.RecipeCategory[i].id == id) {
        $scope.selectedCategory = $scope.RecipeCategory[i];
        return;
      }
    }
    return;
  }
  var prepareList = function(list) {
    for (var date in list) {
      list[date].status = list[date].status ? true :false;
      for (var id in list[date].recipes) {
        list[date].recipes[id].status = list[date].recipes[id].status ? true : false;
      }
    }
    return list;
  }

  var ListSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.items = prepareList(response.data.data.items);
      if (response.data.data.menu && response.data.data.menu.length){
        $scope.menu = response.data.data.menu[0];
      }
      if (response.data.static.RecipeCategory && response.data.static.RecipeCategory.length) {
        $scope.RecipeCategory = response.data.static.RecipeCategory;
      }
    }
    selectCategory($scope.selectedCategoryId);
    $scope.isLoading = false;
  }

  $scope.init();

  $scope.previewCard = function () {
    dmCard.preview($scope.cardId);
  }

  var statusUpdated = function (response) {
  }

  var updateStatus = function (data, id) {
    dmAjax.call({
      method: 'PUT',
      data: data,
      url: '/api/' + $scope.cardId + '/card-item/' + id,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, statusUpdated, statusUpdated);
  }

  
  $scope.dateStatusChanged = function (list, key) {
    if (!list.status){
      for (var prop in $scope.items[key].recipes) {
        $scope.items[key].recipes[prop].status = list.status;
      }
      for (var prop in list.recipes) {
        list.recipes[prop].status = list.status;
      }
    }
    list['type'] = 'date';

    var data = list;
    updateStatus(data, list.id);
  }

  $scope.recipeStatusChanged = function (status, id) {
    var data = {
      id: id,
      status: status,
      type: 'recipe',
    }
    updateStatus(data,id);
  }
});