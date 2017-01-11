angular.module('teamDigest').service('DataDex', ['Pokemon', 'Move', 'Ability', '$rootScope', function(Pokemon, Move, Ability, $rootScope) {
    
    var DataDex = {
        pokemon: [],
        moves: [],
        abilities: [],
        
        load: function(idata) {
            for(var key in idata) {
                if (idata[key] != undefined) {
                    if (key == 'pokemon') {
                        this.pokemon = idata[key];
                    } else if (key == 'moves') {
                        this.moves = idata[key];
                    } else if (key == 'abilities') {
                        this.abilities = idata[key];
                    }
                }
            }    
            
            if (this.pokemon === null) this.pokemon = [];
            if (this.moves === null) this.moves = [];
            if (this.abilities === null) this.abilities = [];
            $rootScope.$broadcast('dexupdate');
        },
        
        clearAll: function() {
            pokemon = [];
            moves = [];
            abilities = [];
            $rootScope.$broadcast('dexupdate');
        },

        getJSON: function() {
            return {pokemon:this.pokemon, moves:this.moves, abilities:this.abilities};
        },

        addPokemon: function(pokemon) {
            this.pokemon.push(new Pokemon(pokemon));
            $rootScope.$broadcast('dexupdate');
        },

        addMove: function(move) {
            this.moves.push(new Move(move));  
            $rootScope.$broadcast('dexupdate');
        },
        
        addAbility: function(ability) {
            this.abilities.push(new Ability(ability));
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
        
        delAbility: function(index) {
            this.abilities.splice(index, 1);
            $rootScope.$broadcast('dexupdate');
        },
        
        checkName: function(name, list) {
            for(var i = list.length; i--; ) {
                if (list[i].name == name) {
                    return list[i];
                }
            }
            return undefined;
        },
        
        getPokeData: function(pokeName) {
            return this.checkName(pokeName, this.pokemon);
        },
        
        getMoveData: function(moveName) {
            return this.checkName(moveName, this.moves);
        },
        
        getAbilityData: function(abilityName) {
            return this.checkName(abilityName, this.moves);
        }
    }
    
    return DataDex;
}]);