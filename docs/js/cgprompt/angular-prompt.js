angular.module('cgPrompt',['ui.bootstrap']);

angular.module('cgPrompt').factory('prompt',['$uibModal','$q',function($uibModal,$q){

    var prompt = function(options){

        var defaults = {
            title: '',
            message: '',
            inputs: [], // {name:string, label:string, type:string, values:[string]}
            buttons: [
                {label:'Cancel',cancel:true},
                {label:'OK',primary:true}
            ]
        };

        if (options === undefined){
            options = {};
        }

        for (var key in defaults) {
            if (options[key] === undefined){
                options[key] = defaults[key];
            }
        }

        var defer = $q.defer();

        $uibModal.open({
            templateUrl:'angular-prompt.html',
            controller: 'cgPromptCtrl',
            resolve:{
                options:function(){
                    return options;
                }
            }
        }).result.then(function(result){
            defer.resolve(result);
        }, function(){
            defer.reject();
        });

        return defer.promise;
    };

    return prompt;
	}
]);

angular.module('cgPrompt').controller('cgPromptCtrl',['$scope','options','$timeout',function($scope,options,$timeout){
    $scope.cgPromptInput = {};
    
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
        
        $scope.$close({button:button,input:$scope.cgPromptInput});
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
            if (elem.select){
                elem.select();
            }
            if (elem.focus){
                elem.focus();
            }
        }
    },100);


}]);

angular.module('cgPrompt').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-prompt.html',
    '<div>\r\n    <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close pull-right\" ng-click=\"$dismiss()\" aria-hidden=\"true\">\u00D7<\/button>\r\n        <h4 class=\"modal-title\">{{options.title}}<\/h4>\r\n    <\/div>\r\n    \r\n    <div class=\"modal-body\">\r\n    \r\n        <p ng-if=\"options.message\">\r\n            {{options.message}}\r\n        <\/p>\r\n\r\n        <form id=\"cgPromptForm\" name=\"form.cgPromptForm\" ng-if=\"options.inputs.length > 0\" ng-submit=\"submit()\">\r\n            <div class=\"form-group\" ng-class=\"{\'has-error\':cgPromptForm.$invalid && changed}\">\r\n                <div ng-repeat=\"option in options.inputs track by $index\">\r\n                    \r\n                    <div ng-if=\"option.type==\'text\'\" class=\"form-group\">\r\n                        <label for=\"{{\'cgPromptInput\'+$index}}\">{{option.label}}<\/label>\r\n                        <input id=\"{{\'cgPromptInput\'+$index}}\" type=\"text\" class=\"form-control {{option.classes}}\" placeholder=\"{{option.label}}\" ng-model=\"cgPromptInput[option.name]\" ng-required=\"{{option.required}}\" ng-change=\"changed=true\" autofocus=\"autofocus\">\r\n                    <\/div>\r\n                    \r\n                    <div ng-if=\"option.type==\'textarea\'\" class=\"form-group\">\r\n                        <label for=\"{{\'cgPromptInput\'+$index}}\">{{option.label}}<\/label>\r\n                        <textarea id=\"{{\'cgPromptInput\'+$index}}\" type=\"text\" class=\"form-control {{option.classes}}\" placeholder=\"{{option.label}}\" ng-model=\"cgPromptInput[option.name]\" ng-required=\"{{option.required}}\" ng-change=\"changed=true\" autofocus=\"autofocus\"><\/textarea>\r\n                    <\/div>\r\n                    \r\n                    <div ng-if=\"option.type==\'select\'\" class=\"form-group\">\r\n                        <label for=\"{{\'cgPromptInput\'+$index}}\">{{option.label}}:<\/label>\r\n                        <select id=\"{{\'cgPromptInput\'+$index}}\" class=\"form-control {{option.classes}}\" ng-model=\"cgPromptInput[option.name]\" ng-required=\"{{option.required}}\" ng-change=\"changed=true\">\r\n                                <option ng-repeat=\"val in option.values track by $index\" value=\"{{val}}\">{{val}}<\/option>\r\n                        <\/select>\r\n                    <\/div>\r\n                    \r\n                    <div ng-if=\"option.type==\'multi-select\'\" class=\"form-group\">\r\n                        <label for=\"{{\'cgPromptInput\'+$index}}\">{{option.label}}:<\/label>\r\n                        <select multiple id=\"{{\'cgPromptInput\'+$index}}\" class=\"form-control {{option.classes}}\" ng-model=\"cgPromptInput[option.name]\" ng-required=\"{{option.required}}\" ng-change=\"changed=true\">\r\n                                <option ng-repeat=\"val in option.values track by $index\" value=\"{{val}}\">{{val}}<\/option>\r\n                        <\/select>\r\n                    <\/div>\r\n                    \r\n                    <div ng-if=\"option.type==\'checkbox\'\" class=\"form-group\">\r\n                        <strong>{{option.label}}<\/strong>\r\n                        <div ng-repeat=\"val in option.values track by $index\" class=\"checkbox\">\r\n                            <label for=\"{{\'cgPromptInput\'+$index}}\" class=\"form-control {{option.classes}}\"><input id=\"{{\'cgPromptInput\'+$index}}\" type=\"checkbox\" ng-model=\"cgPromptInput[option.name][val]\" ng-required=\"{{option.required}}\" ng-change=\"changed=true\" autofocus=\"autofocus\" value=\"val\">{{val}}<\/label>\r\n                        <\/div>\r\n                    <\/div>\r\n                    \r\n                    <div ng-if=\"option.type==\'radio\'\" class=\"form-group\">\r\n                        <strong>{{option.label}}<\/strong>\r\n                        <div ng-repeat=\"val in option.values track by $index\" class=\"radio\">\r\n                            <label for=\"{{\'cgPromptInput\'+$index}}\" class=\"form-control {{option.classes}}\"><input id=\"{{\'cgPromptInput\'+$index}}\" type=\"radio\" name=\"option.name\" ng-model=\"cgPromptInput[option.name]\" ng-required=\"{{option.required}}\" ng-change=\"changed=true\" autofocus=\"autofocus\" value=\"{{val}}\">{{val}}<\/label>\r\n                        <\/div>\r\n                    <\/div>\r\n                    \r\n                <\/div>    \r\n            <\/div>\r\n        <\/form>\r\n\r\n    <\/div>\r\n    <div class=\"modal-footer\">\r\n        <button ng-repeat=\"button in options.buttons track by button.label\" class=\"btn btn-default {{button.class}}\" ng-class=\"{\'btn-primary\':button.primary}\" ng-click=\"buttonClicked(button)\">{{button.label}}<\/button>\r\n    <\/div>\r\n<\/div>'
  );

}]);
