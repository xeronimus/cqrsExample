'use strict';

angular.module('cqrsExampleApp')
  .controller('NavController', function ($scope, CQRS, StoreService) {

    // send a query to the server, requesting data with the id 'name'
    // CQRS will update your scope variable on every update event from the server
    var storeInstance = StoreService.createForController($scope);
    storeInstance.for('personDetailView', {}).do(function (data) {
      $scope.profile = data;
    });
  });
