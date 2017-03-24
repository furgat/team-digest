angular.module('teamDigest').controller(
'TrainerCtrl',
['$scope', 'request', 'typeGrid', 'PokemonTrainer', 'prompt', 'localStorageService', 'DataDex',
function($scope, request, typeGrid, PokemonTrainer, prompt, localStorageService, DataDex) {

    $scope.trainer = new PokemonTrainer();

    $scope.states = {
        OVERVIEW: -1,
        SEARCH: -2
    };

    $scope.interfaceState = -1;

    $scope.stats = ['hp', 'attack', 'defense', 'sp.attack', 'sp.defense', 'speed'];

    if (localStorageService.isSupported) {
        var loadData = localStorageService.get('trainerTeam');

        if (loadData != undefined) {
            $scope.trainer.loadTeam(loadData);
        }
    }

    $scope.initialize = function() {
        $scope.library = {
            pokemon:DataDex.pokemon,
            moves:DataDex.moves
        };
    }
    $scope.initialize();

    $scope.$on('dexupdate', function(event) {
        $scope.initialize();
    });

    $scope.getStatName = function(index) {
        return $scope.stats[index];
    }

    $scope.typeEnter = function() {
        if (event.which == 13) {
            $scope.dexRequest();
        }
    }

    $scope.saveTeam = function() {
        prompt({
            title:'Save Team:',
            message:'Save the current team to Local Storage?'
        }).then(function(response){
            // save to local storage
            if (localStorageService.isSupported) {
                localStorageService.set('trainerTeam', $scope.trainer.team);
            } else {
                // unsupported
            }
        },function(response){
            // don't save to local storage
        });
    };

    $scope.clearTeam = function() {
        prompt({
            title:'Clear Team:',
            message:'Really clear ALL team data?'
        }).then(function(response) {
            $scope.trainer = new PokemonTrainer();
        },function(response) {
                // don't delete anything
        });
    }

    //=
    // typeName :
    // > id - int representation of a type
    // helper function to get type information into HTML
    //=
    $scope.typeName = function(id) {
        return typeGrid.getTypeName(id);
    }

    //=
    // addMember :
    // =
    $scope.addMember = function(name) {
        if (name != '' && name != undefined) {
            $scope.trainer.catch(DataDex.getPokeData(name));
        }
    }

    //=
    // removeMember :
    // > index - the array index of the team member to be removed
    // removes a pokemon from the team
    // =
    $scope.removeMember = function(index) {
        $scope.trainer.release(index);
    }

    //=
    // teachMove :
    // > pokemonIndex, moveName
    //=
    $scope.teachMove = function(pokemonIndex, moveName) {
        if (moveName != '' && moveName != undefined) {
            $scope.trainer.teachMove(pokemonIndex, DataDex.getMoveData(moveName));
        }
    }

    //=
    // changeState :
    //=
    $scope.changeState = function(index) {
        $scope.interfaceState = index;
    }

    //=
    // isState :
    // > index -
    //=
    $scope.isState = function(index) {
        return ($scope.interfaceState == index);
    }



}]);
