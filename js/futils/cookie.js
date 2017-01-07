if (futils === undefined) angular.module('fUtils', ['ngCookies']); 

angular.module('fUtils').factory('cookie', ['$cookies', function($cookies) {
    var permitted = false;
    
    return {
        put: function(key, payload, options) {
            if (permitted) {
                if (arguments.length < 3)
                    $cookies.put(key, payload);
                else
                    $cookies.put(key, payload, options);
            }
        },
        get: function(key) {
            return $cookies.get(key);
        },
        putObj: function(key, payload, options) {
            if (permitted) {
                if (arguments.length < 3)
                    $cookies.putObject(key, payload);
                else
                    $cookies.putObject(key, payload, options);
            }
        },
        getObj: function(key) {
            return $cookies.getObject(key);
        },
        grantPermission: function() {
            permitted = true;
        },
        revokePermission: function() {
            permitted = false;
        },
        permitted: function() {
            return permitted;
        }
    };
}]);