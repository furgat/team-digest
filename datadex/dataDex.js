angular.module('teamDigest').service('DataDex', ['Pokemon', 'Move', '$rootScope', function(Pokemon, Move, $rootScope) {
    
    var DataDex = {
        pokemon: [],
        moves: [],
        
        load: function(idata) {
            for(var key in idata) {
                if (idata[key] != undefined) {
                    if (key == 'pokemon') {
                        this.pokemon = idata[key];
                    } else if (key == 'moves') {
                        this.moves = idata[key];
                    }
                }
            }    
            
            if (this.pokemon === null) this.pokemon = [];
            if (this.moves === null) this.moves = [];
            $rootScope.$broadcast('dexupdate');
        },
        
        clearAll: function() {
            pokemon = [];
            moves = [];
            $rootScope.$broadcast('dexupdate');
        },

        getJSON: function() {
            return {pokemon:this.pokemon, moves:this.moves};
        },

        addPokemon: function(pokemon) {
            this.pokemon.push(new Pokemon(pokemon));
            $rootScope.$broadcast('dexupdate');
        },

        addMove: function(move) {
            this.moves.push(new Move(move));  
            $rootScope.$broadcast('dexupdate');
        },
        
        delPokemon: function(index) {
            this.pokemon.splice(index, 1);
            $rootScope.$broadcast('dexupdate');
        },
        
        delMove: function(index) {
            this.moves.splice(index, 1);
            $rootScope.$broadcast('dexupdate');
        },
        
        getPokeData: function(pokeName) {
            for(var i = this.pokemon.length; i--; ) {
                if (this.pokemon[i].data.name == pokeName) {
                    return this.pokemon[i].data;
                }
            }
            return undefined;
        },
        
        getMoveData: function(moveName) {
            for(var i = this.moves.length; i--; ) {
                if (this.moves[i].data.name == moveName) {
                    return this.moves[i].data;
                }
            }
            return undefined;
        }
    }
    
    return DataDex;
}]);