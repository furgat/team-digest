angular.module('cgPrompt',['ui.bootstrap']);

angular.module('cgPrompt').factory('prompt',['$uibModal','$q',function($uibModal,$q){

    var prompt = function(options){

        var defaults = {
            title: '',
            message: '',
            classes: '',
            inputs: [], // {name:string, label:string, type:string, values:[string]}
            required: true,
            buttons: [
                {label:'Cancel',cancel:true},
                {label:'OK',primary:true}
            ]
        };

        if (options === undefined){
            options = {};
        }

        for (var key in defaults) {
            if (options[key] === undefined) {
                options[key] = defaults[key];
            }
        }

        var defer = $q.defer();

        $uibModal.open({
            templateUrl:'angular-prompt.html',
            controller: 'cgPromptCtrl',
            resolve: {
                options:function(){
                    return options;
                }
            }
        }).result.then(function(result){
            if (options.inputs.length > 0){
                defer.resolve(result.input);
            } else {
                defer.resolve(result.button);
            }
        }, function(){
            defer.reject();
        });

        return defer.promise;
    };

    return prompt;
	}
]);

angular.module('cgPrompt').controller('cgPromptCtrl',['$scope','options','$timeout',function($scope,options,$timeout){
    $scope.input = [];
    
    $scope.options = options;
    $scope.form = {};

    $scope.buttonClicked = function(button){
        if (button.cancel){
            $scope.$dismiss();
            return;
        }
        if (options.inputs.length > 0 && $scope.form.cgPromptForm.$invalid){
            $scope.changed = true;
            return;
        }
        
        $scope.$close({button:button,input:$scope.input});
    };

    $scope.submit = function(){
        var ok;
        angular.forEach($scope.options.buttons,function(button){
            if (button.primary){
                ok = button;
            }
        });
        if (ok){
            $scope.buttonClicked(ok);
        }
    };

    $timeout(function(){
        var elem = document.querySelector('#cgPromptInput');
        if (elem) {
            if (elem.select) {
                elem.select();
            }
            if (elem.focus) {
                elem.focus();
            }
        }
    },100);


}]);