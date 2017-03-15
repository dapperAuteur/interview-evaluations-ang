'use strict';

angular.module("myApp").filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);	
        }
        return [];
       };
});

angular.module("myApp").controller("evaluationsCtrl",['evaluationsService', '$log','$scope', function(evaluationsService, $log, $scope){
    var evalData = this;

    evalData.search=[];
    console.log(evalData.search);
    
    evalData.delete;
//     
//    This is only called when jumping from evals button on persons page
    if(evaluationsService.evalsFromPerson){
    	evalData.search = evaluationsService.evalsFromPersonSearch; // sets the search array to the clicked persons
    	console.log(evalData.search);
    	evaluationsService.evalsFromPerson = false; // clears the ability to set the array if moving to evals from controller other than persons
    }
    
    evalData.currentPage = 1;
    evalData.itemsPerPage = 10;
    evalData.maxSize = 3;
    
    evalData.pageChanged = function() {
         $log.log('Page changed to: ' + evalData.currentPage);
     };
     
     evalData.getEvalById=(function(input){
         var promise = evaluationsService.getEvalById(input);
         promise.then(function(result){
             evalData.search = [result];
            $log.log(evalData.search);
         });
     });
    
    evalData.getTraineeEvals=(function(input){
        var promise = evaluationsService.getTraineeEvaluations(input);
        promise.then(function(result){
            evalData.search = result;
            $log.log(evalData.search);
        });
    });
    
    evalData.getTraineeEvalByWeek=(function(id, week){
        var promise = evaluationsService.getTraineeEvalByWeek(id, week);
        promise.then(function(result){
            evalData.search = result;
            $log.log(evalData.search);
        });
    });
    
    evalData.addNewEval=(function(batchId, typeId, traineeId, weekNum){
        var promise = evaluationsService.addEval(batchId, typeId, traineeId, weekNum);
        promise.then(function(result){
            var endResult =  "Evaluations " +result.id+ " - ADDED";
            evalData.search = [endResult];
            $log.log(evalData.search);
        });
    });
    
    evalData.updateEval=(function(id, batchId, typeId, traineeId, weekNum){
        var promise = evaluationsService.updateEval(id, batchId, typeId, traineeId, weekNum);        
        promise.then(function(result){
            evalData.search = [result];
            $log.log(evalData.search);
        });
    });
    
    evalData.deleteEval=(function(id){
        console.log("Deleting");
        evalData.delete = evaluationsService.deleteEval(id);
        console.log(evalData.delete);
    });
}]);
