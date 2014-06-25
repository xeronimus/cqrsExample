angular.module('cqrsExampleApp')
  .config(function (CQRSProvider) {

    // tell angular.CQRS how to build urls for HTTP GET queries
    CQRSProvider.setUrlFactory(function (dataId) {
      return 'http://localhost:9999/' + dataId + '.json';
    });

    // tell angular.CQRS how to denormalize (or merge) profileChanged events on the resource myProfile
    CQRSProvider.registerDenormalizerFunctions('personDetailView', 'moved', function (personDetailView, change) {
      personDetailView.address = change.address;
      return personDetailView;
    });
  });