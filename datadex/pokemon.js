angular.module('teamDigest').factory('Pokemon', ['typeGrid', function(typeGrid) {
    var Pokemon = function(aPokemon) {
        this.data = {};

        this.initialize = function(initPokemon) {
            var defaults = {
                name:'Ditto', 
                type:['Normal'],
                stats:{'hp':0,'attack':0,'defense':0,'spatk':0,'spdef':0,'speed':0},
                moves:[],
                offensive_matchups:[],
                defensive_matchups:[],
                net_matchups:[]
            };

            for(var key in defaults) {
                this.data[key] = (initPokemon[key] === undefined ? defaults[key] : initPokemon[key] );
            }
        }

        this.initialize(aPokemon);
    }
    
    return (Pokemon);
}]);