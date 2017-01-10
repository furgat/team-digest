angular.module(
    'teamDigest', 
    [
        'ui.bootstrap', 'cgPrompt', 'fUtils', 'LocalStorageModule', 'ngRoute'
    ]
).config(['localStorageServiceProvider', '$routeProvider', function(localStorageServiceProvider, $routeProvider) {
    localStorageServiceProvider.setPrefix('teamDigest');
    
    $routeProvider.when('/trainer', {
        templateUrl: 'trainer/trainer.html',
        controller: 'TrainerCtrl'
    })
    .when('/datadex', {
        templateUrl: 'datadex/datadex.html',
        controller: 'DexCtrl'
    })
    .otherwise({
        redirectTo: '/trainer'
    });
}]).controller('MainCtrl', ['$scope', function($scope) {
    $scope.version = '0.0.0';
    
    $scope.saveAllData = function() {
        
    };
}]);