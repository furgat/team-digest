angular.module('teamDigest').factory('Ability', function() {
    var Ability = function(anAbility) {
        this.data = {};
        
        this.initialize = function(initAbility) {
            var defaults = {
                name:'Levitate',
                description:'Immune to Ground type Moves',
                effect:'' // TODO
            };

            for(var key in defaults) {
                this.data[key] = (initAbility[key] === undefined ? defaults[key] : initAbility[key] );
            }
        }
    
        this.initialize(anAbility);
    }
    
    return (Ability);
});