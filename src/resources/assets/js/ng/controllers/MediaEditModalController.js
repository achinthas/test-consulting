app.controller('MediaEditModalController', function ($scope, dmAjax, dmSettings, dmConstants, dmJQuery, dmMedia) {

  $scope.isLoading = true;

  $scope.imageEditData = "";

  $scope.file = null;

  $scope.fileDetails = null;

  $scope.showCanvas = false;

  $scope.isSubmitted = false;

  $scope.imageChanged = false;

  $scope.deleteMedia = function () {
    if ($scope.currentMedia) {
      dmJQuery.hideModal('#editMediaModal');
      $scope.$parent.deleteMedia($scope.currentMedia.id);
    }
  }

  $scope.$on('openMediaEditModal', function (event,id) {
    resetAll();
    getMedia(id);
  });

  function getMedia(id) {
    dmAjax.call({
      method: 'GET',
      url: dmSettings.media + '/' + id,
      timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
    }, listSuccess, listError);
  }

  var listSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.currentMedia = response.data.data[0];
      $scope.mediaTitle = $scope.currentMedia.name;
      showImage();
    }
    $scope.isLoading = false;
  }

  var listError = function (response) {
    unknownError();
    $scope.isLoading = false;
  }

  var resetAll = function () {
    $scope.showCanvas = false;
    $scope.file = null;
    $scope.fileDetails = null;
    $scope.mediaTitle = '';
    $scope.isSubmitted = false;
    $scope.imageChanged = false;
  }

  $scope.onEditLoad = function (data, file){
    $scope.imageEditData = data;
    $scope.file = file;
    $scope.imageChanged = true;
    if($scope.validImage()){
      $scope.previewImage(data);
    } else {
      $scope.showCanvas = false;
    }
  }

  $scope.previewImage = function (data) {
    var canvas = document.getElementById('mediaFileEditCanvas');
    var width = 120;
    var height = 83;
    canvas.width = width;
    canvas.height = height;
    var img = new Image;
    img.src = data;
    img.onload = function () {
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
    };
    $scope.showCanvas = true;
  }

  var showImage = function () {
    var canvas = document.getElementById('mediaFileEditCanvas');
    var width = 120;
    var height = 83;
    canvas.width = width;
    canvas.height = height;
    var img = new Image;
    img.src = dmSettings.uploads.thumb + $scope.currentMedia.path;
    document.body.appendChild(img);
    img.onload = function () {
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
    };
    $scope.showCanvas = true;
  }

  $scope.validImage = function () {
    var imageDetails = $scope.fileDetails = dmMedia.details($scope.file,1);
    if (imageDetails.validSize && imageDetails.validType) {
      return true;
    }
    return false;
  }

  $scope.saveMedia = function () {
    $scope.isSubmitted = true;
    if ($scope.validateSubmit()) {
      dmAjax.call({
        method: 'PUT',
        data: createMedia(),
        url: dmSettings.media + '/' + $scope.currentMedia.id,
        timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
      }, mediaSaveSuccess, mediaSaveError);
    } else {
    }
  }

  var mediaSaveSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.$parent.updateMediaList();
      dmJQuery.hideModal('#editMediaModal');
      dmJQuery.messageBox(response.data.message, 'message', 'success');
    }
  }

  var mediaSaveError = function (response) {
    dmJQuery.hideModal('#editMediaModal');
    dmJQuery.messageBox(dmConstants.errorMessage.common, 'message', 'danger');
    $scope.updateMediaList();
  }

  $scope.validateSubmit = function () {
    if (!$scope.mediaTitle) {
      return false;
    } else if ($scope.imageChanged && !$scope.validImage()) {
      return false;
    }
    return true;
  }

  var createMedia = function () {
    media = {
      "name": $scope.mediaTitle,
      "type": "background",
    }

    if ($scope.imageChanged) {
      media["image"] = $scope.imageEditData;
    }
    return media;
  }
});