angular.module(
    'teamDigest',
    [
        'ui.bootstrap', 'cgPrompt', 'fUtils', 'LocalStorageModule', 'ngRoute'
    ]
).config(['localStorageServiceProvider', '$routeProvider', function(localStorageServiceProvider, $routeProvider, DataDex) {
    localStorageServiceProvider.setPrefix('teamDigest');

    $routeProvider.when('/trainer', {
        templateUrl: './components/trainer/trainer.html',
        controller: 'TrainerCtrl'
    })
    .when('/datadex', {
        templateUrl: './components/datadex/datadex.html',
        controller: 'DexCtrl'
    })
    .otherwise({
        redirectTo: '/trainer'
    });
}]).controller('MainCtrl', ['$scope', '$location', 'DataDex', 'localStorageService', function($scope, $location, DataDex, localStorageService) {
    $scope.version = '0.0.0';

    if (localStorageService.isSupported) {
        var loadData = localStorageService.get('dataDexLibrary');

        if (loadData != undefined) {
            DataDex.load(loadData);
        }
    }

    $scope.navigate = function(to) {
        $location.path(to);
    };
}]);
