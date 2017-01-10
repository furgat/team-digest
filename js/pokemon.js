angular.module('teamDigest');

angular.module('teamDigest').factory('Pokemon', ['typeGrid', function(typeGrid) {
    this.data = {};
    
    this.initialize = function(data) {
        var defaults = {
            name:'Ditto', 
            type:['Normal'],
            stats:{'hp':0,'attack':0,'defense':0,'spatk':0,'spdef':0,'speed':0},
            moves:[],
            offensive_matchups:[],
            defensive_matchups:[],
            net_matchups:[]
        }
    }
    
    return (Pokemon);
}]);