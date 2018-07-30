app.factory('dmMenu', function ($rootScope, dmJQuery) {

  return {
    edit : function(id){
      $rootScope.$broadcast('openMenuEditModal', id);
      dmJQuery.openModal('#editMenuModal');
    },

    add : function(){
      $rootScope.$broadcast('openMenuAddModal');
      dmJQuery.openModal('#addMenuModal');
    }
  }
});