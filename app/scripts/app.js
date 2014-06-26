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
      mySocket.on('events', function (event) {
         CQRS.eventReceived(event);
      });

      // pass commands to socket
      CQRS.onCommand(function (command) {
         mySocket.emit('commands', command);
      });

    // tell angular.CQRS how to denormalize (or merge) profileChanged events on the modelView personDetailView
    StoreService.registerDenormalizerFunction('profile', 'person', 'moved', function (oldProfile, payload) {
      if(payload.id === oldProfile.person.id){
        oldProfile.person.address = payload.address;
      }

      return oldProfile;
    });

    StoreService.registerDenormalizerFunction('profile', 'employer', 'hired', function (oldEmployer, newEmployee) {
      oldEmployer.employees.push(newEmployee);
      return oldEmployer;
    });
   });
