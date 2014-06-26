'use strict';

angular.module('cqrsExampleApp')
  .controller('MainCtrl', function ($scope, CQRS, StoreService, WrapperService) {

    var store = StoreService.createForController($scope);

    store.for('profile').do(function (personDetails) {
      $scope.personDetails = personDetails;
    });

    WrapperService.getWrapped('profile').then(function (data) {
      console.log('callback from wrapperService', data);
    });


    $scope.onChangeProfile = function () {
      CQRS.sendCommand('person', 'move', {
        id: $scope.personDetails.id,
        address: 'my entered new address'
      });
    };


  });
