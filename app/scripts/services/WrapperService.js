'use strict';

angular.module('cqrsExampleApp')
  .service('WrapperService', function (StoreService, $q) {

    var container = {};

    function getWrapped(modelView, parameters) {
      var deferred = $q.defer();
      StoreService.for(modelView, parameters).do(function (result) {
//            console.log('callback in wrapper', result);
        container[modelView] = result;
        deferred.resolve(result);
      });
      return deferred.promise;
    }

    return {
      getWrapped: getWrapped
    };

  });
