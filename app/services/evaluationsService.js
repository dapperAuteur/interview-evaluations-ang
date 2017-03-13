'use strict';
angular.module('myApp').service('evaluationsService', function($http){
    
    this.getEvalById=(function(input){
        var localData;
        var evaluations = [];
        $http.get("//localhost:8080/api/v1/evaluations/"+input+"").then(function(response){
            localData=response;
            for(i=0;i<localData.content.length;i++){
                evaluations.push(localData.content[i]);
            }
            return evaluations;
        });        
    });
    
    this.getTraineeEvaluations=(function(input){
        var localData;
        var evaluations = [];
        $http.get("//localhost:8080/api/v1/evaluations/trainees/"+input+"").then(function(response){
            localData=response;
            for(i=0;i<localData.content.length;i++){
                evaluations.push(localData.content[i]);
            }
            return evaluations;
        });         
    });
    
    
    this.getTraineeEvalByWeek=(function(id,week){
        var localData;
        var evaluations = [];
        $http.get("//localhost:8080/api/v1/evaluations/trainees/"+id+"/week/"+week+"").then(function(response){
            localData=response;
            for(i=0;i<localData.content.length;i++){
                evaluations.push(localData.content[i]);
            }
            return evaluations;
        });        
    });
    
    
    this.addEval=(function(batchId, typeId, traineeId, weekNum){
        var localData;
        
        var data = {
            batch : {
                id : batchId
            },
            evalType : {
                id : typeId   
            },
           trainee : {
               id : traineeId
           },
           week : weekNum
        };
        
        $http.post("//localhost:8080/api/v1/evaluations", data).then(function(response){
            localData = response;
            return "Evaluations " +localData.id+ " - ADDED";
        });
    });
    
    
    this.updateEval=(function(id, batchId, evalTypeId, traineeId, weekNum){
        var localData;
        
        var l_batchId;
        var l_evalTypeId;
        var l_traineeId;
        var l_weekNum;
        
         if(batchId.toString().length !== 0){
            l_batchId = batchId;
        }

        if(evalTypeId.toString().length !== 0){
            l_evalTypeId = evalTypeId;
        }

        if(traineeId.length !== 0){
            l_traineeId = traineeId;
        }

        if(weekNum.toString().length !== 0){
            l_weekNum = weekNum;
        }
        
        var data = {
            batch : {
                id : l_batchId
            },
            evalType : {
                id : l_evalTypeId   
            },
           trainee : {
               id : l_traineeId
           },
           week : l_weekNum
        };
        
        $http.put("//localhost:8080/api/v1/evaluations/update/"+id+"", data).then(function(response){
            localData = response;
            return localData;
        });
        
    });
    
    
    this.deleteEval=(function(id){
         $http.delete("//localhost:8080/api/v1/evaluations/delete/"+id+"").then(function(){
            return "Evaluation: "+id+" - DELETED";
        }).error(function(status){
            alert("Error -  No Evaluation with ID : "+id+" found in database");
            return status;
        });        
    });
});
