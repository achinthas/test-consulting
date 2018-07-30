app.controller('MediaController', function ($scope, $location, $window, dmSettings, dmAjax, dmConstants, dmMedia, dmJQuery) {

  // $scope.isLoading = true;

  $scope.media = [];

  $scope.showPagination = false;

  $scope.MediaAvailable = true;

  $scope.editMedia = function (id) {
    dmMedia.edit(id);
  }

  $scope.addMedia = function () {
    dmMedia.add();
  }

  $scope.clearFilters = function () {
    $scope.searchQuery = "";
    $scope.search();
  }

  $scope.thumbPath = dmSettings.uploads.thumb;

  //Pagination
  $scope.pagination = {
    maxSize: 3,
    totalItems: 0,
    currentPage: $location.search().page ? $location.search().page : "",
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
    $scope.updateMediaList();
  }

  //Update Page
  $scope.updateMediaList = function () {
    dmAjax.call({
      method: 'GET',
      params: {
        query: $scope.searchQuery,
        page: $scope.pagination.currentPage,
      },
      url: dmSettings.media,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, listSuccess, listError);
  }

  var listSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      if (!response.data.data.data || response.data.data.data.length == 0) {
        $scope.MediaAvailable = false;
        $scope.showPagination = false;
      } else {
        $scope.MediaAvailable = true;
        $scope.media = response.data.data.data;
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
    $scope.isLoading = false;
  }

  //Initiate page
  $scope.init = function () {
    $scope.updateMediaList();
  };

  $scope.init();

  //Delete

  $scope.deleteMedia = function (id) {
    dmJQuery.messageBox('Are you sure you want to delete this item?', 'confirmation', 'danger').then(function () {
      $scope.deleteMediaConfirmed(id);
    }, function () { });
  }

  $scope.deleteMediaConfirmed = function (id) {
    dmAjax.call({
      method: 'DELETE',
      url: dmSettings.media + '/' + id,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, deleteSuccess, deleteError);
  };

  var deleteSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      dmJQuery.messageBox(response.data.message, 'message', 'success');
    }
    $scope.updateMediaList();
  }
  var deleteError = function (response) {
    dmJQuery.messageBox(response.data.message, 'message', 'danger');
    $scope.updateMediaList();
  }

});