app.controller('MediaUploadModalController', function ($scope, dmAjax, dmSettings, dmConstants, dmJQuery, dmMedia) {


  $scope.imageData = "";

  $scope.file = null;

  $scope.fileDetails = null;

  $scope.showCanvas = false;

  $scope.isSubmitted = false;

  $scope.$on('openMediaAddModal', function (event) {
    resetAll();
  });

  var resetAll = function () {
    $scope.showCanvas = false;
    $scope.file = null;
    $scope.fileDetails = null;
    $scope.mediaTitle = '';
    $scope.isSubmitted = false;
  }

  $scope.onLoad = function (data, file){
    $scope.imageData = data;
    $scope.file = file;
    if($scope.validImage()){
      $scope.previewImage(data);
    } else {
      $scope.showCanvas = false;
    }
  }

  $scope.previewImage = function (data) {
    var canvas = document.getElementById('mediaFileCanvas');
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

  $scope.validImage = function () {
    var imageDetails = $scope.fileDetails = dmMedia.details($scope.file,1);
    if (imageDetails.validSize && imageDetails.validType) {
      return true;
    }
    return false;
  }

  $scope.addMedia = function () {
    $scope.isSubmitted = true;
    if ($scope.validateSubmit()) {
      dmAjax.call({
        method: 'POST',
        data: createMedia(),
        url: dmSettings.media,
        timeout: dmConstants.DEFAULT_REQUEST_TIMEOUT
      }, mediaSaveSuccess, mediaSaveError);
    }
  }

  var mediaSaveSuccess = function (response) {
    if (response && response.status && response.status === 200) {
      $scope.$parent.updateMediaList();
      dmJQuery.hideModal('#addMediaModal');
      dmJQuery.messageBox(response.data.message, 'message', 'success');
    }
  }

  var mediaSaveError = function (response) {
    dmJQuery.hideModal('#addMediaModal');
    dmJQuery.messageBox(dmConstants.errorMessage.common, 'message', 'danger');
    $scope.updateMediaList();
  }

  $scope.validateSubmit = function () {
    if (!$scope.mediaTitle) {
      return false;
    } if (!$scope.validImage()) {
      return false;
    }
    return true;
  }

  var createMedia = function () {
    media = {
      "name": $scope.mediaTitle,
      "type": "background",
      "image": $scope.imageData, 
    }
    return media;
  }
});