'use strict';

angular.module('cqrsExampleApp')
   .controller('MainCtrl', function ($scope, CQRS, Store, WrapperService) {

      // send a query to the server, requesting data with the id 'name'
      // CQRS will update your scope variable on every update event from the server
      Store.get('myProfile', function (data) {
         $scope.profile = data;
      });

      Store.get('myProfile', function (data) {
         $scope.profile = data;
      });


      WrapperService.getWrapped('myProfile').then(function (data) {
//         console.log('callback from wrapperService', data);
      });


      $scope.$watch('profile', function (changedProfile) {
//         console.log('profile has changed', changedProfile);
      });

      $scope.onChangeProfile = function () {
         CQRS.sendCommand('changeProfile', {
            id: $scope.profile.id,
            description: 'newDescription',
            username: 'someThing'
         });
      };

      $scope.onErase = function () {
         Store.clear();
      };

   });
