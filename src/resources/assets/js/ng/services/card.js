app.factory('dmCard', function ($rootScope, dmJQuery) {

  return {
    edit : function(id){
      $rootScope.$broadcast('openCardEditModal', id);
      dmJQuery.openModal('#editCardModal');
    },

    add : function(){
      $rootScope.$broadcast('openCardAddModal');
      dmJQuery.openModal('#addCardModal');
    },

    preview : function (id) {
      $rootScope.$broadcast('openCardPreviewModal', id);
      dmJQuery.openModal('#previewCardModal');
    }
  }
});