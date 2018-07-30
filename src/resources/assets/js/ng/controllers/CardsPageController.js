app.controller('CardController', function ($scope, $location, $window, dmSettings, dmAjax, dmConstants, dmCard, dmJQuery) {

  $scope.isLoading = true;

  $scope.CardsAvailable = true;

  $scope.showPagination = false;

  $scope.cards = [];

  $scope.menus = [];

  $scope.thumbPath = dmSettings.uploads.thumb;

  $scope.guid = $window.Data.guid ? $window.Data.guid : '';

  $scope.base_url = $window.Data.base_url ? $window.Data.base_url : '',

  $scope.editCard = function (id) {
    dmCard.edit(id);
  }

  $scope.addCard = function () {
    dmCard.add();
  }

  $scope.clearFilters = function () {
    $scope.searchQuery = "";
    $scope.selectedMenu = null;
    $scope.search();
  }

  //Pagination
  $scope.pagination = {
    maxSize: 3,
    totalItems: 0,
    currentPage: $location.search().page ? $location.search().page : 1,
    itemsPerPage: 20,
  }

  $scope.pageChanged = function () {
    $scope.search(true);
  };

  $scope.previewCard = function (id) {
    dmCard.preview(id);
  }
  
  //Search
  $scope.searchQuery = $location.search().query ? $location.search().query : "";
  $scope.selectedMenuId = $location.search().menu_id ? $location.search().menu_id : "";

  $scope.search = function (stayOnPage) {
    if (!stayOnPage){
      $scope.pagination.currentPage = 1;
    }
    $location.search({
      query: $scope.searchQuery,
      page: $scope.pagination.currentPage,
      menu_id: $scope.selectedMenu ? $scope.selectedMenu.id : "",
    });
    $scope.updateCardList();
  }

  //Update Page
  $scope.updateCardList = function () {
    dmAjax.call({
      method: 'GET',
      params: {
        query: $scope.searchQuery,
        page: $scope.pagination.currentPage,
        menu_id: $scope.selectedMenu ? $scope.selectedMenu.id : '',
      },
      url: dmSettings.card.list,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, listSuccess, listError);
  }

  var listSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      if (!response.data.data.data || response.data.data.data.length == 0) {
        $scope.CardsAvailable = false;
        $scope.showPagination = false;
        $scope.cards = [];
      } else {
        $scope.CardsAvailable = true;
        $scope.cards = response.data.data.data;
        $scope.pagination.totalItems = response.data.data.total;
        $scope.pagination.itemsPerPage = response.data.data.per_page;
        $scope.showPagination = false;
        if (response.data.data.last_page > 1) {
          $scope.showPagination = true;
        }
      }
    }
    $scope.isLoading = false;
  };

  var listError = function (response) {
    dmJQuery.messageBox(response.data.message, 'message', 'danger');
  }

  $scope.copyText = function (str) {
    var textArea = document.createElement("textarea");
    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
    } catch (err) {
    }
    document.body.removeChild(textArea);
  }
  

  //Initiate page
  $scope.init = function () {
    getMenus();
  };

  var getMenus = function () {
    dmAjax.call({
      method: 'GET',
      url: dmSettings.menu.list,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, menuListSuccess, listError, 'media');
  }

  var menuListSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.menus = response.data.data.data;
      selectMenu($scope.selectedMenuId);
      $scope.updateCardList();
    }
  }

  var selectMenu = function (id) {
    for (var i = 0; i < $scope.menus.length; i++) {
      if ($scope.menus[i].id == id) {
        $scope.selectedMenu = $scope.menus[i];
        return;
      }
    }
    return;
  }

  $scope.init();

  

  //Delete
  $scope.deleteCard = function (id) {
    dmJQuery.messageBox('Are you sure you want to delete this item?', 'confirmation', 'danger').then(function () {
      $scope.deleteCardConfirmed(id);
    }, function () { });
  }

  $scope.deleteCardConfirmed = function (id) {
    dmAjax.call({
      method: 'DELETE',
      url: dmSettings.card.list + '/' + id,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, deleteSuccess, deleteError);
  };

  var deleteSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      dmJQuery.messageBox(response.data.message, 'message', 'success');
    }
    $scope.updateCardList();
  }
  var deleteError = function (response) {
    dmJQuery.messageBox(response.data.message, 'message', 'danger');
  }

});