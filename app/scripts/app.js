'use strict';

angular
   .module('cqrsExampleApp', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute',
      'ngCQRS'
   ])
   .config(function ($routeProvider, CQRSProvider) {
      $routeProvider
         .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
         })
         .otherwise({
            redirectTo: '/'
         });


      // tell angular.CQRS how to build urls for HTTP GET queries
      CQRSProvider.setUrlFactory(function (dataId) {
         return 'http://localhost:9999/' + dataId + '.json';
      });

      CQRSProvider.registerDenormalizer('myProfile', 'profileChanged', function (originalData, delta) {
         // TODO: manipulate originalData such that it includes delta...
      });


   })
   .run(function (CQRS) {
      // connect angular.CQRS to your socket / long polling solution, etc.

      var mySocket = io('http://localhost:9999');

      // pass in events from your socket
      mySocket.on('events', function (data) {
         CQRS.eventReceived(data);
      });

      // pass commands to socket
      CQRS.onCommand(function (data) {
         mySocket.emit('commands', data);
      });
   });
