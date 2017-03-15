'use strict';
angular.module('myApp').service('evaluationsService', function($http, $q){

    this.getEvalById=(function(input){
        var deferred = $q.defer();
        $http.get("//localhost:8080/api/v1/evaluations/"+input+"").then(function(response){
            deferred.resolve(response.data);
        });        
        return deferred.promise;
    });

    this.getTraineeEvaluations=(function(input){
        var localData;
        var evaluations = [];
        var deferred = $q.defer();
        $http.get("//localhost:8080/api/v1/evaluations/trainees/"+input+"").then(function(response){
            localData=response;
            for(var i=0; i<localData.data.content.length; i++){
                evaluations.push(localData.data.content[i]);
            }
            deferred.resolve(evaluations);
        });        
        return deferred.promise;
    });


    this.getTraineeEvalByWeek=(function(id,week){
        var localData;
        var evaluations = [];
        var deferred = $q.defer();
        $http.get("//localhost:8080/api/v1/evaluations/trainees/"+id+"/week/"+week+"").then(function(response){
            localData=response;
            for(var i=0;i<localData.data.content.length;i++){
                evaluations.push(localData.data.content[i]);
                }
            deferred.resolve(evaluations);
        });        
        return deferred.promise;
    });


    this.addEval=(function(batchId, typeId, traineeId, weekNum){
        var localData;
        var deferred = $q.defer();

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
            localData = response.data;
            deferred.resolve(localData);
        });
        return deferred.promise;
    });


    this.updateEval=(function(id, batchId, evalTypeId, traineeId, weekNum){
        var localData;
        var deferred = $q.defer();

        var promise = this.getEvalById(id);

        var l_batchId;
        var l_evalTypeId;
        var l_traineeId;
        var l_weekNum;

        promise.then(function(result){

            var evaluation = result;
            console.log(evaluation);
            console.log(batchId);

            if(batchId){
                l_batchId = batchId;
            } else {
                l_batchId = evaluation.batch.id;
            }

            if(evalTypeId){
                l_evalTypeId = evalTypeId;
            } else {
                l_evalTypeId = evaluation.evalType.id;
            }

            if(traineeId){
                l_traineeId = traineeId;
            } else {
                l_traineeId = evaluation.trainee.id;
            }

            if(weekNum){
                l_weekNum = weekNum;
            } else {
                l_weekNum = evaluation.week;
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

            $http.put("//localhost:8080/api/v1/evaluations/"+id+"", data).then(function(response){
                localData = response.data;
                deferred.resolve(localData);
            });   
        });
        return deferred.promise;    
    });


    this.deleteEval=(function(id){
        $http.delete("//localhost:8080/api/v1/evaluations/"+id+"").then(function(){
            console.log("Evaluation: "+id+" - DELETED");
            return "Evaluation: "+id+" - DELETED";
        });      
    });
});
