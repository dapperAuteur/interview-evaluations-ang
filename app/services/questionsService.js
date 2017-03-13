'use strict';
angular.module('myApp').service('questionsService', function($http){

    var localData;
    var questions = [];

    this.getQuestions = (function(input){
        if(input.length === 0){
            input="all";
        }
        $http.get("//localhost:8080/api/v1/questions?subject=" + input +"").then(function(response){
            localData=response;
            for(i=0;i<localData.content.length;i++){
                questions.push(localData.content[i]);
            }
            return questions;
        });
    });

    this.searchForQuestions = (function(input1, input2){
        var promise;

        promise = $http.get("//localhost:8080/api/v1/questions/search?subject="+input2+"&searchText=" + input1 +"")
        

        promise.then(function(response){
            localData=response;
            for(i=0;i<localData.content.length;i++){
                questions.push(localData.content[i]);
            }
            return questions;
        }).error(function(response,status){
            alert("Error - Could not find Questions matching your parameters in database");
            return status;
        });
    });

    this.addNewQuestion = (function(maxComScore, maxKnowScore, qText, subjectId){
        var data = {
            maxCommunicationScore : maxComScore,
            maxKnowledgeScore : maxKnowScore,
            questionText : qText,
            subject : {
                id : subjectId
            }
        };

        $http.post("//localhost:8080/api/v1/questions", data).then(function(response){
            localData = response;
            return localData;
        });
    });

    this.deleteQuestion = (function(id){
        $http.delete("//localhost:8080/api/v1/questions/delete/"+id+"").then(function(){
            return "Question: "+id+" - DELETED";
        }).error(function(status){
            alert("Error -  No Question with ID : "+id+" found in database");
            return status;
        });
    });

    this.updateQuestion = (function(id, maxComScore, maxKnowScore, qText, subjectId){
        var l_maxComScore;
        var l_maxKnowScore;
        var l_qText;
        var l_subjectId;

        if(maxComScore.toString().length !== 0){
            l_maxComScore = maxComScore;
        }

        if(maxKnowScore.toString().length !== 0){
            l_maxKnowScore = maxKnowScore;
        }

        if(qText.length !== 0){
            l_qText = qText;
        }

        if(subjectId.toString().length !== 0){
            l_subjectId = subjectId;
        }
        
         var data = ({
            maxCommunicationScore : l_maxComScore,
            maxKnowledgeScore : l_maxKnowScore,
            questionText : l_qText,
            subject : {
                id : l_subjectId
            }
        });
        
        $http.put("//localhost:8080/api/v1/questions/update/"+id+"", data).then(function(response){
            localData = response;
            return localData;
        });
    });
});