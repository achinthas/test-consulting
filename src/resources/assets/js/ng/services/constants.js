app.factory('dmConstants', function ($window) {
  return {
    APP: {
      DOMAIN: $window.appURL,
      PREFIX: '/api/'
    },

    DEFAULT_REQUEST_TIMEOUT : 60000,

    errorMessage: {
      common: 'Sorry, Something Went Wrong: Please try again later.',
    },

    guid : $window.Data.guid ? $window.Data.guid : '',

  };
});