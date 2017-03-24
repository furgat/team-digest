// credit: http://stackoverflow.com/a/15848150
//angular.module('fUtils', []);

angular.module('fUtils').directive('btnHref', function ( $location ) {
    return function ( scope, element, attrs ) {
        var path;

        attrs.$observe( 'btnHref', function (val) {
            path = val;
        });

        element.bind('click', function () {
            scope.$apply(function () {
                $location.path( path );
            });
        });
    };
});