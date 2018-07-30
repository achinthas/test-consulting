app.factory('dmJQuery', function ($q) {

  return {
    openModal: function(selector){
      $(selector).modal();
      $(selector).on('hide.bs.modal', function (e) {
        $('.modal-backdrop').remove();
      })
    },

    hideModal: function (selector) {
      $(selector).modal('hide');
    },

    messageBox: function (msg,type,cssClass) {
      cssClass = cssClass || 'default';
      if (type === "confirmation") { 
        var promise = $q(function (resolve, reject) {
          $('#commonModal').modal();
          $('#commonModal').find('#megboxBody').text(msg);
          $('#commonModal').find('.modal-content').addClass(cssClass);
          $('#commonModal').find('#cancelBtn').show();
                  
            $('#commonModal').find('#confirmBtn').on('click', function(e){
              resolve(true);
              $('#commonModal').modal('hide');
              $('#commonModal').find('#confirmBtn').off();
            });
            $('#commonModal').on('hide.bs.modal', function (e) {
              reject(false);
              $('.modal-backdrop').remove();
              $('#commonModal').find('.modal-content').removeClass(cssClass);
            })
        });
        return promise;
      } else {
        $('#commonModal').modal();
        $('#commonModal').find('#megboxBody').text(msg);
        $('#commonModal').find('.modal-content').addClass(cssClass);
        $('#commonModal').find('#cancelBtn').hide();
        $('#commonModal').find('#confirmBtn').on('click', function (e) {
          $('#commonModal').modal('hide');
          $('#commonModal').find('#confirmBtn').off();
          $('#commonModal').find('.modal-content').removeClass(cssClass);
        });
        $('#commonModal').on('hide.bs.modal', function (e) {
          $('.modal-backdrop').remove();
        })
      }
    }
  }
});