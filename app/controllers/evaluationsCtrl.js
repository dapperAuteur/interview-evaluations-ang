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
    
    evalData.showAdd = false;
    evalData.showUpdate= false;
    
    evalData.search=[];
    evalData.delete;
    
    evalData.currentPage = 1;
    evalData.itemsPerPage = 10;
    evalData.maxSize = 3;
    
    evalData.pageChanged = function() {
         $log.log('Page changed to: ' + evalData.currentPage);
     };
     
     evalData.getEvalById=(function(input){
         evalData.search = evaluationsService.getEvalById(input);
     });
    
    evalData.getTraineeEvals=(function(input){
        evalData.search = evaluationsService.getTraineeEvaluations(input);
    });
    
    evalData.getTraineeEvalByWeek=(function(id, week){
        evalData.search = evaluationsService.getTraineeEvalByWeek(id, week);
    });
    
    evalData.addNewEval=(function(batchId, typeId, traineeId, weekNum){
        evalData.search = evaluationsService.addEval(batchId, typeId, traineeId, weekNum);
    });
    
    evalData.updateEval=(function(id, batchId, typeId, traineeId, weekNum){
        evalData.search = evaluationsService.updateEval(id, batchId, typeId, traineeId, weekNum);        
    });
    
    evalData.deleteEval=(function(id){
        evalData.delete = evaluationsService.deleteEval(id);
    });
}]);
