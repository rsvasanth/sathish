(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('ApiService', function ($q, $http, ENV) {

      this.checkConnection = function () {
        return $q(function (resolve, reject) {
          $http.get(ENV.apiUrl + '/settings')
            .success(resolve)
            .error(reject);
        });
      };

      this.deactmember = function (id) {
        return $q(function (resolve, reject) {
          $http.put(ENV.apiUrl + 'Members/'+id+'/dacttivate')
            .success(resolve)
            .error(reject);
        });
      };

    });

})();
