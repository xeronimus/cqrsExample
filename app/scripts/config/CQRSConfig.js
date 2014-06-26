angular.module('cqrsExampleApp')
  .config(function (CQRSProvider) {

    // tell angular.CQRS how to build urls for HTTP GET queries
    CQRSProvider.setUrlFactory(function (viewModel, parameters) {
      return 'http://localhost:9999/' + viewModel + '.json';
    });
  });