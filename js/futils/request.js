if (futils === undefined) angular.module('fUtils', []); 

angular.module('fUtils').factory('request', ['$http', '$q', function($http, $q) {
    return {
        make: function(options) {
            var deferred = $q.defer();
            $http(options).then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(response) {
                    deferred.reject();
                }
            );
            return deferred.promise;
        }
    };
}]);