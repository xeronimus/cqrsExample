'use strict';

angular.module('cqrsExampleApp')
   .controller('MainCtrl', function ($scope, CQRS, Store, WrapperService) {

      // send a query to the server, requesting data with the id 'name'
      // CQRS will update your scope variable on every update event from the server
      Store.get('personDetailView', function (personDetails) {
        $scope.personDetails = personDetails;
      });

      WrapperService.getWrapped('personDetailView').then(function (data) {
//         console.log('callback from wrapperService', data);
      });


      $scope.$watch('profile', function (changedProfile) {
//         console.log('profile has changed', changedProfile);
      });

      $scope.onChangeProfile = function () {
        CQRS.sendCommand('person', 'move', {
            id: $scope.personDetails.id,
            address: 'my entered new address'
        });
      };

      $scope.onErase = function () {
         Store.clear();
      };

   });
