app.controller('MenuController', function ($scope, $location, $window, dmSettings, dmAjax, dmConstants, dmMenu, dmJQuery) {

  $scope.isLoading = true;

  $scope.MenusAvailable = true;

  $scope.showPagination = false;

  $scope.menus = [];
  
  $scope.editMenu = function (id) {
    dmMenu.edit(id);
  }

  $scope.addMenu = function () {
    dmMenu.add();
  }

  $scope.syncMenu = function (id) {
    $scope.isLoading = true;
    dmAjax.call({
      method: 'PUT',
      url: dmSettings.menu.list + '/' + id + '/sync',
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, syncSuccess, syncError);
  }

  var syncSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      dmJQuery.messageBox(response.data.message, 'message', 'success');
    }
    $scope.isLoading = false;
  }

  var syncError = function (response) {
    dmJQuery.messageBox(response.data.message, 'message', 'danger');
    $scope.isLoading = false;
  }

  $scope.guid = $window.Data.guid ? $window.Data.guid : '';

  $scope.clearFilters = function() {
    $scope.searchQuery = "";
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

  //Search
  $scope.searchQuery = $location.search().query ? $location.search().query : "";

  $scope.search = function (stayOnPage) {
    if (!stayOnPage) {
      $scope.pagination.currentPage = 1;
    }
    $location.search({
      query: $scope.searchQuery,
      page: $scope.pagination.currentPage,
    });
    $scope.updateMenuList();
  }

  //Update Page
  $scope.updateMenuList = function(){
    dmAjax.call({
      method: 'GET',
      params: {
        query: $scope.searchQuery,
        page: $scope.pagination.currentPage,
      },
      url: dmSettings.menu.list,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, listSuccess, listError);
  }

  var listSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      if (!response.data.data.data || response.data.data.data.length==0){
        $scope.MenusAvailable = false;
      } else {
        $scope.MenusAvailable = true;
        $scope.menus = response.data.data.data;
        $scope.pagination.totalItems = response.data.data.data.length;
        $scope.pagination.totalItems = response.data.data.total;
        $scope.pagination.itemsPerPage = response.data.data.per_page;
        if (response.data.data.last_page > 1){
          $scope.showPagination = true;
        }
      }
    }
    $scope.isLoading = false;
  };

  var listError = function (response) {
    dmJQuery.messageBox(response.data.message, 'message', 'danger');
  }

  //Initiate page
  $scope.init = function () {
    $scope.updateMenuList();
  };

  $scope.init();

  //Delete

  $scope.deleteMenu = function (id) {
    dmJQuery.messageBox('Are you sure you want to delete this item?', 'confirmation', 'danger').then(function () {
      $scope.deleteMenuConfirmed(id);
    }, function () {});
  }

  $scope.deleteMenuConfirmed = function(id){
    dmAjax.call({
      method: 'DELETE',
      url: dmSettings.menu.list+'/'+id,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, deleteSuccess, deleteError);
  };

  var deleteSuccess = function(response){
    if (response && response.status && response.status === 200) {
      dmJQuery.messageBox(response.data.message, 'message', 'success');
    }
    $scope.updateMenuList();
  }
  var deleteError = function(response){
    dmJQuery.messageBox(response.data.message, 'message', 'danger');
    $scope.updateMenuList();
  }

});