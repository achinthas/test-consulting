app.directive("fileread", [function () {
  return {
    scope: {
      fileread: "=",
      file: "=",
      onFileLoaded: "&"
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.fileread =loadEvent.target.result;
            scope.onFileLoaded({ data: scope.fileread, file: changeEvent.target.files[0]});
          });
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
        scope.file = changeEvent.target.files[0];
      });
    }
  }
}]);
