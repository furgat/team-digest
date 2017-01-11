angular.module('teamDigest').controller('DexCtrl', ['$scope', 'localStorageService', 'typeGrid', 'prompt', 'DataDex', function($scope, localStorageService, typeGrid, prompt, DataDex) {
    // bind library
    $scope.initialize = function() {
        $scope.library = {
            pokemon:DataDex.pokemon, 
            moves:DataDex.moves
        };
    }
    
    $scope.initialize();
    
    $scope.$on('dexupdate', function(event) {
        $scope.initialize();
    });
    
    //=
    // customPokemon :
    // prompts the user for some basic pokemon input and then adds to the team
    // TODO - give add pokemon its own view
    //=
    $scope.customPokemon = function() {
        prompt({
            title:'Add A Pokemon',
            message:'Define what sort of Pokemon you would like to add:',
            inputs:[
                {
                    name:'name',
                    label:'Name',
                    type:'text',
                },
                {
                    name:'type',
                    label:'Type 1',
                    type:'select',
                    values: typeGrid.typeEnum
                },
                {
                    name:'type2',
                    label:'Type 2',
                    type:'select',
                    required:false,
                    values: typeGrid.typeEnum
                },
                {
                    name:'stats',
                    label:'Stats Array (CSV):',
                    type:'text'
                }
            ]
        })
        .then(function(results) { 
            var typingTemp = [];

            var stats = results.input.stats.split(',');

            if (results.input.type != '' && results.input.type != undefined)
                typingTemp.push(results.input.type);

            if (results.input.type2 != '' && results.input.type2 != undefined)
                typingTemp.push(results.input.type2);

            DataDex.addPokemon({
                name:results.input.name, 
                type:typingTemp,
                stats: stats
            });
        },
        function() {
        });
    }
    
    $scope.delPokemon = function(index) {
        DataDex.delPokemon(index);
    }
    
    //=
    // addMove :
    // > index - the array index of the team member to edit
    // adds a move to the team member's movelist, for now prompts with a modal
    // TODO - give adding moves its own view
    //=
    $scope.customMove = function(index) {        
        prompt({
            title:'Add A Move',
            message:'Define what sort of move you would like to add:',
            inputs:[
                {
                    name:'name',
                    label:'Name:',
                    type:'text'
                },
                {
                    name:'type',
                    label:'Type:',
                    type:'select',
                    values: typeGrid.typeEnum
                },
                {
                    name:'contact',
                    label:'Makes Contact:',
                    type:'select',
                    values: [true, false]
                },
                {
                    name:'stat',
                    label:'Atk or Sp.Atk:',
                    type:'select',
                    values: ['atk', 'spatk']
                },
                {
                    name:'power',
                    label:'Power:',
                    type:'text'
                },
                {
                    name:'accuracy',
                    label:'Accuracy:',
                    type:'text'
                },
                {
                    name:'recoil',
                    label:'Recoil (%):',
                    type:'text'
                },
                {
                    name:'effect',
                    label:'Effect Description:',
                    type:'text'
                },
               {
                    name:'pp',
                    label:'Power Points:',
                    type:'text'
                }
            ]
        })
        .then(function(results) { 
            DataDex.addMove(results.input);
        },
        function() {
            // rejected
        });
    }
    
    $scope.delMove = function(index) {
        DataDex.delMove(index);
    }
    
    //=
    // dexRequest :
    // makes a request to pokeapi.co by pokemon type
    // TODO: more comprehensive search function
    //       likely should be wrapped in its own service to be called from here
    /*
    $scope.dexRequest = function() {
        // disallow searching for nothing
        if ($scope.searchtype != '' && $scope.searchtype != undefined) {
            // update search status for user
            $scope.status = 'Searching for '+ $scope.searchtype + '...';
            
            $scope.pokebase = [];
            // find get string based on search box configuration
            var response = request.make(
                {method: 'GET', url: 'http://pokeapi.co/api/v2/type/' + $scope.searchtype}
            ).then(
                function(response) { 
                    $scope.pokebase = response.pokemon; 
                    $scope.status = 'Search Complete!';
                },
                function(response) {
                    $scope.status = 'Something went Wrong,,,';
                }
            );

        } else {
            // display tip to the user
            $scope.status = 'Enter a Type to search, first.';
        }
    };*/
    
    //=
    // addApiMon : 
    // > obj - the object that this was called from
    // gets the name of the pokemon from the button that was clicked, then makes a request to
    // pokemon.co by the pokemon's name. then adds it to party
    // TODO: probably should have http requests handled in a service
    /*
    $scope.addApiMon = function(obj) {
        // only add pokemon to team if yr team is not full
        // cap may change based on team format (singles, doubles, battle spot, etc...)
        if (!pokemonTrainer.isTeamFull()) {
            var name = obj.target.attributes.data.value;
            $scope.status = 'Adding ' + name + ' to Team...';

            var response = request.make(
                {method:'GET', url:'http://pokeapi.co/api/v2/pokemon/'+name}
            ).then(
                function(response) {
                    var typeData = [];
                
                    for (var i = response.types.length; i--; ) {
                        typeData[i] = response.types[i].type.name;
                    }
                
                    $scope.trainer.catch({name:response.name, typing:typeData});
                    $scope.status = name + ' added to team!';
                },
                function(response) {
                    $scope.status = 'Something went wrong,,,';
                }
            );
        } else {
            $scope.status = 'Your team is full, try Removing a pokemon first.';
        }
    };*/
    
    $scope.saveLibrary = function() {
                /*if (!cookie.permitted()) {
            prompt({
                title:'Permission Needed',
                message:'Allow teamDigest to store Cookies?'
            }).then(function(response) {
                cookie.grantPermission();
                cookie.put('tdCookiePermission', true);
                $scope.saveTeam();
            },
            function(response) {
                return;
            });
        } else {
            cookie.putObj('tdPokemonTrainerTeam', pokemonTrainer.getTeam());
        }*/
        prompt({
            title:'Save Data',
            message:'Save the dataDEX Library to Local Storage?'
        }).then(function(response){
            // save to local storage    
            if (localStorageService.isSupported) {
                localStorageService.set('dataDexLibrary', DataDex.getJSON());
            } else {
                // unsupported
            }
        },function(response){
            // don't save to local storage
        });
    }
    
}]);