var pokemonData = angular.module('pokemonData');

pokemonData.factory('pokeApi', ['$http', '$q', function($http, $q) {
    return {
        makeRequest: function(options) {
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