'use strict';

angular.module('cqrsExampleApp')
  .service('WrapperService', function (StoreService, $q) {

    var container = {},
      store = StoreService.createForService();

    function getWrapped(modelView, parameters) {
      var deferred = $q.defer();
      store.for(modelView, parameters).do(function (result) {
        container[modelView] = result;
        deferred.resolve(result);
      });
      return deferred.promise;
    }

    return {
      getWrapped: getWrapped
    };

  });
