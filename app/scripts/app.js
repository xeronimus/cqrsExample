'use strict';

angular
   .module('cqrsExampleApp', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute',
      'ngCQRS'
   ])
   .config(function ($routeProvider) {
      $routeProvider
         .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
         })
         .when('/second', {
            templateUrl: 'views/second.html',
            controller: 'SecondCtrl'
         })
         .otherwise({
            redirectTo: '/'
         });
   })
   .run(function (CQRS, StoreService) {
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

    // tell angular.CQRS how to denormalize (or merge) profileChanged events on the modelView personDetailView
    StoreService.registerDenormalizerFunction('personDetailView', 'moved', function (personDetailView, change) {
      personDetailView.address = change.address;
      return personDetailView;
    });
   });
