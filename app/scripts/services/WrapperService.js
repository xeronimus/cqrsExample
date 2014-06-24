'use strict';

angular.module('cqrsExampleApp')
   .service('WrapperService', function (Store, $q) {

      var container = {};

      function getWrapped(dataId) {
         var deferred = $q.defer();
         Store.get(dataId, function (result) {
//            console.log('callback in wrapper', result);
            container[dataId] = result;
            deferred.resolve(result);
         });
         return deferred.promise;
      }

      return {
         getWrapped: getWrapped
      };

   });
