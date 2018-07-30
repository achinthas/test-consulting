app.factory('dmSettings', function ($window, dmConstants, dmAjax) {

  var getAPI = function (path) {
    return dmConstants.APP.PREFIX + path;
  };

  return {
    menu: {
      list: getAPI("menu"),
    },

    card: {
      list: getAPI("card"),
    },

    static: getAPI('static'),

    sync: getAPI('sync'),

    media: getAPI('media'),

    uploads: {
      thumb: '/images/upload/thumbnail/',
      original: '/images/upload/original/',
    }

  };
});