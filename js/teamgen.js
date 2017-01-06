var application = angular.module('furgatTeamDigest', ['ui.bootstrap', 'cgPrompt']);

// constant orders
// stats: [hp, attack, defense, sp.atk, sp.def, speed]
// types: [nrml, fire, water, elec, grass, ice, fght, psn, grnd, fly, psy, bug, rock, gho, drgn, drk, stl, fairy]

// pokemon data readout
// name
// type/type2
// ability
// held item
// moves

// offensive ability ( each type gets rated with a % score, highest value only, based on selected moves )
// e.g. if u have a water attack and a normal attack, Rock would be rated Weak (Water), not Resisted (Normal)
// - weak against
// - normal damage
// - resisted

// defensive ability ( each type gets rated with a % score )
// - weak against
// - normal damage
// - resisted

// total coverage ( take the average of every type's score across offense and defense )
// - Easy Prey
// - Some Advantage
// - Evenly Matched
// - Some Disadvantage
// - RUN AWAY

// average the entire party to see how type matchups are overall

application.service('typeGrid', function() {
    // offenses ->>>
    // typeMatrix[type][i++]
    // defenses vvvv
    // typeMatrix[i++][type]
    this.typeMatrix = [
      // nrm, fir, wtr, elc, grs, ice, fgt, psn, grn, fly, psy, bug, rck, gho, dra, drk, stl, fai
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,  50,   0, 100, 100,  50, 100], // normal
        [100,  50,  50, 100, 200, 200, 100, 100, 100, 100, 100, 200,  50, 100,  50, 100, 200, 100], // fire
        [100, 200,  50, 100,  50, 100, 100, 100, 200, 100, 100, 100, 200, 100,  50, 100, 100, 100], // water
        [100, 100, 200,  50,  50, 100, 100, 100,   0, 200, 100, 100, 100, 100,  50, 100, 100, 100], // electric
        [100,  50, 200, 100,  50, 100, 100,  50, 200,  50, 100,  50, 200, 100,  50, 100,  50, 100], // grass
        [100,  50,  50, 100, 200,  50, 100, 100, 200, 200, 100, 100, 100, 100, 200, 100,  50, 100], // ice
        [200, 100, 100, 100, 100, 200, 100,  50, 100,  50,  50,  50, 200,   0, 100, 200, 200,  50], // fighting
        [100, 100, 100, 100, 200, 100, 100,  50,  50, 100, 100, 100,  50,  50, 100, 100,   0, 200], // poison
        [100, 200, 100, 200,  50, 100, 100, 200, 100,   0, 100,  50, 200, 100, 100, 100, 200, 100], // ground
        [100, 100, 100,  50, 200, 100, 200, 100, 100, 100, 100, 200,  50, 100, 100, 100,  50, 100], // flying
        [100, 100, 100, 100, 100, 100, 200, 200, 100, 100,  50, 100, 100, 100, 100,   0,  50, 100], // psychic
        [100,  50, 100, 100, 200, 100,  50,  50, 100,  50, 200, 100, 100,  50, 100, 200,  50,  50], // bug
        [100, 200, 100, 100, 100, 200,  50, 100,  50, 200, 100, 200, 100, 100, 100, 100,  50, 100], // rock
        [  0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 200, 100, 100, 200, 100,  50, 100, 100], // ghost
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 200, 100,  50,   0], // dragon
        [100, 100, 100, 100, 100, 100,  50, 100, 100, 100, 200, 100, 100, 200, 100,  50, 100,  50], // dark
        [100,  50,  50,  50, 100, 200, 100, 100, 100, 100, 100, 100, 200, 100, 100, 100,  50, 200], // steel
        [100,  50, 100, 100, 100, 100, 200,  50, 100, 100, 100, 100, 100, 100, 200, 200,  50, 100]  // fairy
    ];
    
    this.typeEnum = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];
    
    //=
    // getTypeName :
    // > id - int, the id of the type to fetch
    // returns the name of the id associated from this.typeEnum
    //=
    this.getTypeName = function(id) {
        return this.typeEnum[id];
    };
    
    //=
    // getTypeId :
    // > type - string, the name of the type whose id to fetch
    // fetches the array associated with the type from this.typeEnum
    //=
    this.getTypeId = function(type) {
        for(var i = this.typeEnum.length;i--;) {
            if (this.typeEnum[i] == type) 
                return i;
        }
        return 0; // default to normal type
    };
    
    //=
    // compareOffense :
    // > attacker - JSON object containing attacker data
    //
    //=
    this.rateOffense = function(attacker) {
        var attackerTypes = attacker.type;
        var movelist = attacker.moves;
        var effectiveness = [];
        
        // loop thru each move
        for(var i = movelist.length;i--;) {
            if ( movelist[i].damaging == true || movelist[i].damaging == 'true' ) { // only process if it is a damaging move
                var moveType = this.getTypeId(movelist[i].type);

                for(var y = this.typeEnum.length;y--;) {
                    if (effectiveness[y] == undefined) 
                        effectiveness[y] = 0; // default to zero effectiveness
                    
                    var damage = this.typeMatrix[moveType][y]; //[move type][defending type]
                    
                    // check for STAB Bonus
                    for(var x = attackerTypes.length;x--;) {
                        if (attackerTypes[x] == movelist[i].type) {
                            damage *= 1.5;
                        }
                    }
                    
                    // only if this move will do 'more' damage than earlier evaluated moves
                    if (effectiveness[y] < damage) 
                        effectiveness[y] = damage;
                }
            }
        }
        
        return effectiveness;
    };
    
    //=
    // compareDefense :
    // > defender - JSON object containing defender data
    // compare defense typing against every type and return an array of effectiveness
    //=
    this.rateDefense = function(defender) {
        var types = defender.type;
        var defenses = defender.defensive_matchups;
        // go thru both types
        for(var i = types.length; i--;) {
            var t = this.getTypeId(types[i]); // get the type ID
            
            // loop thru all of the types and multiply against defensive rating
            // multiplying like percentages, 
            // e.g. 100% * 100% = 100%
            //      or, 200% * 50% = 100%
            for (var y = this.typeEnum.length; y--;) {
                defenses[y] *= (this.typeMatrix[y][t]/100);
            }
        }
        return defenses;
    };
});

application.controller('teamdigest', ['$scope', '$http', 'typeGrid', 'prompt', function($scope, $http, typeGrid, prompt) {
    
    $scope.version = '1.0.0';
    
    $scope.team = [];
    
    $scope._OVERVIEW = -1;
    $scope._SEARCH = -2;
    $scope.interfaceState = $scope._OVERVIEW;
                                          
    $scope.teamMatchups = [];
    
    $scope.stats = ['hp', 'attack', 'defense', 'sp.atk', 'sp.def', 'speed'];
    
    // cap for teamsize
    $scope.teamCap = 6;
    
    $scope.typeEnter = function() {
        if (event.which == 13) {
            $scope.dexRequest();
        } // Return
    };
    
    $scope.typeName = function(id) {
        return typeGrid.getTypeName(id);
    }
    
    //=
    // catchMon :
    // > data : { name:'string', types:['string', ...] }
    // basic helper function to add a new pokemon to yr team
    //=
    $scope.catchMon = function(data) {
        var temPoke = {
            name:data.name, 
            type:data.typing,
            stats:[],
            moves:[],
            offensive_matchups:[], 
            defensive_matchups:[],
            net_matchups:[]
        };
        
        // initialize type matchups to 100%
        // initialize net matchups to 0 ( we subtract defense from offense for actual data )
        for (var i = typeGrid.typeEnum.length; i--; ) {
            temPoke.offensive_matchups[i] = 0;
            temPoke.defensive_matchups[i] = 100;
            temPoke.net_matchups[i] = 0;
        }
                
        temPoke.defensive_matchups = typeGrid.rateDefense(temPoke);
                
        $scope.status = 'Complete!';
        $scope.team.push(temPoke);
        
    }
    
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
            $http({
                method: 'GET',
                url: 'http://pokeapi.co/api/v2/type/' + $scope.searchtype
            }) // get
            .then(function(response) {
                $scope.status = 'Complete!';
                $scope.pokebase = response.data.pokemon;
            },
            function(response) {
                $scope.status = 'There was an Error,,';
            });
        } else {
            // display tip to the user
            $scope.status = "Enter a Type to search, first.";
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
        if ($scope.team.length < $scope.teamCap) {
            var name = obj.target.attributes.data.value;
            $scope.status = 'Adding ' + name + ' to Team...';

            $http({
                method: 'GET',
                url: 'http://pokeapi.co/api/v2/pokemon/'+name
            })
            .then(function(response){
                // create a temporary variable to format type data
                var typeData = [];
                
                for (var i = response.data.types.length; i--; ) {
                    typeData[i] = response.data.types[i].type.name;
                }
                
                $scope.catchMon({name:response.data.name, typing:typeData});
            },
            function(response){
                $scope.status = 'There was an Error,,';
            });
        } else {
            $scope.status = "Your team is full, try Removing a pokemon first."
        }
    };
    
    //=
    // removeMember :
    // > index - the array index of the team member to be removed
    // removes a pokemon from the team
    // =
    $scope.removeMember = function(index) {
        $scope.team.splice(index, 1);
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
    //  { 'name':string, 'type':string, 'damaging':boolean }
    //=
    $scope.addMove = function(index) {
        prompt({
            title:'Add A Move',
            message:'Define what sort of move you would like to add:',
            inputs:[
                {
                    name:'name',
                    label:'Name',
                    type:'text',
                },
                {
                    name:'type',
                    label:'Type',
                    type:'select',
                    values: typeGrid.typeEnum
                },
                {
                    name:'damaging',
                    label:'Is Damaging?',
                    type:'select',
                    values: [true, false]
                }
            ]
        })
        .then(function(results) { 
            console.log(results);
            $scope.team[index].moves.push({
                name: results.input.name,
                type: results.input.type,
                damaging: results.input.damaging
            });
            
            $scope.team[index].offensive_matchups = typeGrid.rateOffense($scope.team[index]);
            $scope.team[index].net_matchups = $scope.netRatings($scope.team[index]);
            $scope.teamMatchups = $scope.teamNetAverage();
        },
        function() {
        });
    };
                                          
    //=
    // customPokemon :
    // prompts the user for some basic pokemon input and then adds to the team
    //=
    $scope.customPokemon = function() {
        if ($scope.team.length < $scope.teamCap) {
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

                if (results.input.type != '' && results.input.type != undefined) typingTemp.push(results.input.type);
                if (results.input.type2 != '' && results.input.type2 != undefined) typingTemp.push(results.input.type2);

                $scope.catchMon({name:results.input.name, typing:typingTemp});
            },
            function() {
            });
        }
    };
    
    //=
    // netRatings:
    // > pokemon - the pokemon whose ratings to compare
    //=
    $scope.netRatings = function(pokemon) {
        var offense = pokemon.offensive_matchups;
        var defense = pokemon.defensive_matchups;
        var net = [];
        
        for (var i = offense.length;i--;) {
            net[i] = offense[i] - defense[i]; // subtract defense from offense to find net
        }
        
        return net;
    }
    
    //=
    // teamNetAverage:
    //=
    $scope.teamNetAverage = function() {
        var tempNet = [];
        var teamLength = $scope.team.length;
        
        for (var n = typeGrid.typeEnum.length; n--; ) {
            tempNet[n] = 0;
            for(var i = teamLength; i--; ) {
                tempNet[n] += $scope.team[i].net_matchups[n];    
            }
            tempNet[n] /= teamLength;
        }
        
        return tempNet;
    }
    
}]);