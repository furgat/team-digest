var pokemonData = angular.module('teamDigest');

pokemonData.factory('pokemonTrainer', ['typeGrid', function(typeGrid) {
    
    this.team = [];
    this.matchups = [];
    
    this.MOVE_CAP = 4;
    this.TEAM_CAP = 3;
    
    this.stats = ['hp', 'attack', 'defense', 'sp.atk', 'sp.def', 'speed'];
    
    this.catch = function(pokemon) {
        var temPoke = {
            name:pokemon.name, 
            type:pokemon.typing,
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
                
        this.team.push(temPoke);
    };
    
    this.release = function(index) {
        this.team.splice(index, 1);
    }
    
    this.getTeam = function() {
        return this.team;
    }
    
    this.netRatings = function(pokemon) {
        var offense = pokemon.offensive_matchups;
        var defense = pokemon.defensive_matchups;
        var net = [];
        
        for (var i = offense.length;i--;) {
            net[i] = offense[i] - defense[i]; // subtract defense from offense to find net
        }
        
        return net;
    }

    this.teamNetAverage = function() {
        var tempNet = [];
        var team = this.team;
        var numTypes = typeGrid.typeEnum.length;
        var teamLength = this.team.length;
        
        for (var n = numTypes; n--; ) {
            tempNet[n] = 0;
            for(var i = teamLength; i--; ) {
                tempNet[n] += team[i].net_matchups[n];    
            }
            tempNet[n] /= teamLength;
        }
        
        return tempNet;
    }
    
    this.teachMove = function(pindex, move) {
        var moveData = {};
        var pokemon = this.team[pindex];
        
        for (key in move) {
            moveData[key] = move[key];
        }
        
        pokemon.moves.push(move);
            
        this.ratePokemon();
    }
    
    this.forgetMove = function(pindex, mindex) {
        this.team[pindex].moves.splice(mindex, 1);
        this.ratePokemon();
    }
    
    this.ratePokemon = function() { 
        var team = this.team;
        for (var i = this.team.length; i--; ) {
            var pokemon = team[i];
            pokemon.offensive_matchups = typeGrid.rateOffense(pokemon);
            pokemon.net_matchups = this.netRatings(pokemon);
        }
        this.teamMatchups = this.teamNetAverage();
    }
    
    this.getTeamMatchups = function() {
        return this.matchups;
    };
    
    this.isTeamFull = function() {
        return (this.team.length == this.TEAM_CAP);
    }
    
    this.isMovelistFull = function(index) {
        return (this.team[index].moves.length == this.MOVE_CAP);
    }
    
    return this;
}]);