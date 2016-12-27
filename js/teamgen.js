var application = angular.module('furgatTeamDigest', []);

// constant orders
// stats: [hp, attack, defense, sp.atk, sp.def, speed]
// types: [nrml, fire, water, elec, grass, ice, fght, psn, grnd, fly, psy, bug, rock, gho, drgn, drk, stl, fairy]

application.controller('teamdigest', function($scope, $http){
    
    $scope.team = [];
    
    // declare some enums for assistance
    $scope.types = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];
    
    $scope.stats = [
        'hp', 'attack', 'defense', 'sp.atk', 'sp.def', 'speed'
    ];
    
    // cap for teamsize
    $scope.teamCap = 3;
    
    $scope.typeEnter = function() {
        if (event.which == 13) {
            $scope.dexRequest();
        } // Return
    };
    
    $scope.dexRequest = function() {
        // disallow searching for nothing
        if ( $scope.searchtype != '' && $scope.searchtype != undefined ) {
            // update search status for user
            $scope.status = 'Searching for '+ $scope.searchtype +'...';
            
            $scope.pokebase = [];
            // find get string based on search box configuration
            $http.get('http://pokeapi.co/api/v2/type/' + $scope.searchtype) // get
            .success(function(response) {
                $scope.status = 'Complete!';
                $scope.pokebase = response.pokemon;
            })
            .error(function(response) {
                $scope.status = 'There was an Error,,';
            });
        } else {
            // display tip to the user
            $scope.status = "Enter a Type to search, first.";
        }
    };
    
    $scope.add = function(obj) {
        if ( $scope.team.length < $scope.teamCap ) {
            var name = obj.target.attributes.data.value;
            $scope.status = 'Adding ' + name + ' to Team...';

            $http.get('http://pokeapi.co/api/v2/pokemon/'+name)
            .success(function(response){
                // create a temporary variable to hold the JSON object for each pokemon
                var temPoke = {
                    'name':response.name, 
                    'type':[],
                    'stats':[],
                    'moves':[],
                    'offensive_matchups':[],
                    'defensive_matchups':[],
                    'net_matchups':[]
                };
                
                // reverse loop b/c order doesn't really matter here rn
                // starts at length, i yields value before decrementing, so every index is processed
                for (var i = response.types.length; i--; ) {
                    temPoke.type.push(response.types[i].type.name);
                }
                
                // initialize type matchups to 100%
                // initialize net matchups to 0 ( we subtract defense from offense for actual data )
                for (var i = $scope.types.length; i--; ) {
                    temPoke.offensive_matchups[i] = 100;
                    temPoke.defensive_matchups[i] = 100;
                    temPoke.net_matchups[i] = 0;
                }
                
                $scope.status = 'Complete!';
                $scope.team.push(temPoke);
            })
            .error(function(response){
                $scope.status = 'There was an Error,,';
            });
        } else {
            $scope.status = "Your team is full, try Removing a pokemon first."
        }
    }
    
});