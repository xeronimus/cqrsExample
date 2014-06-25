'use strict';

angular.module('cqrsExampleApp')
   .controller('NavController', function ($scope, CQRS, Store) {

      // send a query to the server, requesting data with the id 'name'
      // CQRS will update your scope variable on every update event from the server
      Store.get('personDetailView', function (data) {
         $scope.profile = data;
      });

   });
