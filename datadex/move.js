angular.module('teamDigest').factory('Move', function() {
    var Move = function(aMove) {
        this.data = {};
        
        this.initialize = function(initMove) {
            var defaults = {
                name:'Struggle', 
                type:'normal',
                contact:true,
                stat:'atk',
                power:50,
                accuracy:100,
                recoil:25,
                effect:'',
                pp:0
            };

            for(var key in defaults) {
                this.data[key] = (initMove[key] === undefined ? defaults[key] : initMove[key] );
            }
        }
    
        this.initialize(aMove);
    }
    
    return (Move);
});