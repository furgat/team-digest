var pokemonData = angular.module('teamDigest');
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

pokemonData.service('typeGrid', function() {
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
            if ( movelist[i].power > 0 ) { // only process if it is a damaging move
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