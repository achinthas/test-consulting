app.factory('dmAjax', ['$http', 'dmConstants', function ($http, dmConstants) {

  var error = function (response, errorCallback) {
    errorCallback(response);
  };

  var success = function (response, successCallback) {
        successCallback(response);
  };
  return {
    //Web service call function
    call: function (config, successCallback, errorCallback,static) {
      config.headers = {
        'Auth-guid': dmConstants.guid,
      }
      if (static) {
        config.headers["x-static-content"] = static;
      }
      return $http(config).then(function (response) {
        success(response, successCallback);
      }, function (response) {
        error(response, errorCallback);
      });
    },
  };
}]);