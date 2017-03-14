'use strict';
angular.module('myApp').service('questionsService', function(evaluationsService,$http,$q){

    this.makeQuestionEval=(function(evalId,data){
        var deferred = $q.defer();
        $http.post("//localhost:8080/api/v1/evaluations/"+evalId+"/questions", data).then(function(response){
            deferred.resolve(response.data);
        });
        return deferred.promise;
    });

    this.getQuestionById = (function(input){
        var deferred = $q.defer();
         $http.get("//localhost:8080/api/v1/questions/" + input +"").then(function(response){
            deferred.resolve(response.data);
        });
        return deferred.promise;
    });

    this.getQuestions = (function(input){
        var localData;
        var questions = [];
        
        var deferred = $q.defer();
        
        if(!input){
            input="all";
        }
        $http.get("//localhost:8080/api/v1/questions?subject=" + input +"").then(function(response){
            localData=response;
            for(var i=0;i<localData.data.content.length;i++){
                questions.push(localData.data.content[i]);
            }
            deferred.resolve(questions);
        });
        return deferred.promise;
    });

    this.searchForQuestions = (function(input1, input2){
        var localData;
        var questions = [];
        
        var deferred = $q.defer();
        
        if(!input2){
            input2="all";
        }
        
        $http.get("//localhost:8080/api/v1/questions/search?subject="+input2+"&searchText=" + input1 +"").then(function(response){
            localData=response;
            for(var i=0;i<localData.data.content.length;i++){
                questions.push(localData.data.content[i]);
            }
            deferred.resolve(questions);
        });
        return deferred.promise;
    });

    this.addNewQuestion = (function(maxComScore, maxKnowScore, qText, subjectId){
        var localData;
        var deferred = $q.defer();
        
        var data = {
            maxCommunicationScore : maxComScore,
            maxKnowledgeScore : maxKnowScore,
            questionText : qText,
            subject : {
                id : subjectId
            }
        };

        $http.post("//localhost:8080/api/v1/questions", data).then(function(response){
            localData = response.data;
            deferred.resolve(localData);
        });
        return deferred.promise;
    });
    
    this.addQuestionToEval = (function(question,evalId,comScore,knoScore){
        var localData;
        var deferred = $q.defer();
        
        var data = {
                communicationScore : comScore,
                knowledgeScore : knoScore,
                questionPool : question
            };
            
        var qEval = this.makeQuestionEval(evalId,data);
        
        qEval.then(function(response){
            localData = response;
            deferred.resolve(localData);
        });
        return deferred.promise;
    });

    this.deleteQuestion = (function(id){
        $http.delete("//localhost:8080/api/v1/questions/"+id+"").then(function(){
            return "Question: "+id+" - DELETED";
        });
    });

    this.updateQuestion = (function(id, maxComScore, maxKnowScore, qText, subjectId){
        var localData;
        var deferred = $q.defer();
        
        var promise = this.getQuestionById(id);
    
        var l_maxComScore;
        var l_maxKnowScore;
        var l_qText;
        var l_subjectId;
        
        promise.then(function(result){

            var question = result;

            if(maxComScore){
                l_maxComScore = maxComScore;
            } else {
                l_maxComScore = question.maxCommunicationScore;
            }

            if(maxKnowScore){
                l_maxKnowScore = maxKnowScore;
            } else {
                l_maxKnowScore = question.maxKnowledgeScore;
            }

            if(qText){
                l_qText = qText;
            } else {
                l_qText = question.questionText;
            }

            if(subjectId){
                l_subjectId = subjectId;
            } else {
                l_subjectId = question.subject.id;
            }

             var data = {
                maxCommunicationScore : l_maxComScore,
                maxKnowledgeScore : l_maxKnowScore,
                questionText : l_qText,
                subject : {
                    id : l_subjectId
                }
            };

            $http.put("//localhost:8080/api/v1/questions/"+id+"", data).then(function(response){
                localData = response.data;
                deferred.resolve(localData);
            });
        });
        return deferred.promise;
    });
});