var application = angular.module(
    'teamDigest', 
    [
        'ui.bootstrap', 'cgPrompt', 'fUtils'
    ]
);

application.controller('MainCtrl', ['$scope', 'request', 'typeGrid', 'pokemonTrainer', 'prompt', 'cookie', function($scope, request, typeGrid, pokemonTrainer, prompt, cookie) {
    
    $scope.version = '1.0.0';
    
    $scope.states = {
        OVERVIEW: -1,
        SEARCH: -2
    }
    
    $scope.interfaceState = $scope.states.OVERVIEW;
    
    console.log(cookie.get('tdCookiePermission'));
    var cookiePermission = cookie.get('tdCookiePermission');

    if ( cookiePermission == undefined ) {
        cookiePermission = false;
    } else if ( cookiePermission ) {
        cookie.grantPermission();
        cookie.put('tdCookiePermission', cookiePermission);
        pokemonTrainer.loadTeam(cookie.getObj('tdPokemonTrainerTeam'));
    }
    
    $scope.TEAM_CAP = pokemonTrainer.TEAM_CAP;
    $scope.MOVE_CAP = pokemonTrainer.MOVE_CAP;
    $scope.team = pokemonTrainer.team;
    
    $scope.typeEnter = function() {
        if (event.which == 13) {
            $scope.dexRequest();
        }
    };
    
    $scope.grabTeam = function() {
        $scope.team = pokemonTrainer.getTeam();
    };
    
    $scope.saveTeam = function() {
        if (!cookie.permitted()) {
            prompt({
                title:'Permission Needed',
                message:'Allow teamDigest to store Cookies?'
            }).then(function(response) {
                cookie.grantPermission();
                cookie.put('tdCookiePermission', cookiePermission);
                $scope.saveTeam();
            },
            function(response) {
                return;
            });
        } else {
            cookie.putObj('tdPokemonTrainerTeam', pokemonTrainer.getTeam());
        }
    };
    
    $scope.clearData = function() {
        
    };
    
    //=
    // typeName : id
    // > id - int representation of a type
    // helper function to get type information into HTML
    //=
    $scope.typeName = function(id) {
        return typeGrid.getTypeName(id);
    };
    
    //=
    // teamMatchups :
    // helper function to get matchups to the HTML
    $scope.teamMatchups = function() {
        return pokemonTrainer.getTeamMatchups();
    };
    
    //=
    // dexRequest :
    // makes a request to pokeapi.co by pokemon type
    // TODO: more comprehensive search function
    //       likely should be wrapped in its own service to be called from here
    //=
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
    };
    
    //=
    // addApiMon : 
    // > obj - the object that this was called from
    // gets the name of the pokemon from the button that was clicked, then makes a request to
    // pokemon.co by the pokemon's name. then adds it to party
    // TODO: probably should have http requests handled in a service
    //=
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
                
                    pokemonTrainer.catch({name:response.name, typing:typeData});
                    $scope.status = name + ' added to team!';
                },
                function(response) {
                    $scope.status = 'Something went wrong,,,';
                }
            );
        } else {
            $scope.status = 'Your team is full, try Removing a pokemon first.';
        }
    };
    
    //=
    // removeMember :
    // > index - the array index of the team member to be removed
    // removes a pokemon from the team
    // =
    $scope.removeMember = function(index) {
        pokemonTrainer.release(index);
    };
                                          
    //=
    // changeState :
    //=
    $scope.changeState = function(index) {
        $scope.interfaceState = index;
    }
    
    //=
    // addMove :
    // > index - the array index of the team member to edit
    // adds a move to the team member's movelist, for now just 
    //  { 
    //      name:'string', type:'string', contact:boolean, stat:'atk:spatk', power:int, accuracy:int, recoil:int,
    //      effect:'string', pp:int 
    //  }
    //=
    $scope.addMove = function(index) {        
        if (!pokemonTrainer.isMovelistFull(index)) {
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
                console.log(results);
                pokemonTrainer.teachMove(index, results.input);
            },
            function() {
                // rejected
            });
        }
    };
    
    $scope.forgetMove = function(pindex, mindex) {
        pokemonTrainer.forgetMove(pindex, mindex);
    };
                                          
    //=
    // customPokemon :
    // prompts the user for some basic pokemon input and then adds to the team
    //=
    $scope.customPokemon = function() {
        if (!pokemonTrainer.isTeamFull()) {
            prompt({
                title:'Add A Team Member',
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
                    }
                ]
            })
            .then(function(results) { 
                var typingTemp = [];

                if (results.input.type != '' && results.input.type != undefined) {
                    typingTemp.push(results.input.type);
                } 
                
                if (results.input.type2 != '' && results.input.type2 != undefined) {
                    typingTemp.push(results.input.type2);
                }
                 
                pokemonTrainer.catch({name:results.input.name, typing:typingTemp});
            },
            function() {
            });
        }
    };
    
}]);
        