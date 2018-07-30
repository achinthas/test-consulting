app.factory('dmMedia', function ($rootScope, dmJQuery) {

  return {
    edit : function(id){
      $rootScope.$broadcast('openMediaEditModal', id);
      dmJQuery.openModal('#editMediaModal');
    },

    add : function(){
      $rootScope.$broadcast('openMediaAddModal');
      dmJQuery.openModal('#addMediaModal');
    },

    details: function (file,maxSize) {
      if (!file) {
        return null;
      }
      var fSExt = ['Bytes', 'KB', 'MB', 'GB'];
      var validFileTypes = ['image/jpeg', 'image/png'];

      var _size = file.size;
      var fileSize = _size;
      var i = 0;
      while (_size > 900) { _size /= 1024; i++; }
      var exactSize = (Math.round(_size * 100) / 100) + ' ' + fSExt[i];

      var isValidType = validFileTypes.indexOf(file.type) > -1;

      var imageDetails = {
        'size': exactSize,
        'validSize': true,
        'name': file.name,
        'type': file.type,
        'validType': isValidType,
      };


      if (maxSize) {
        maxSize = 1024 * 1024 * maxSize;
        if (maxSize < fileSize) {

          imageDetails['validSize'] = false;
        }
      }
      return imageDetails;
    }
  }
});