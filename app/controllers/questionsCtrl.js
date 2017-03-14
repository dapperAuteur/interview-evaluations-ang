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

angular.module('myApp').controller('questionsCtrl',['questionsService', '$log', function(questionsService,$log){
    var questionData = this;

    questionData.search = [];
    questionData.delete;
    
    questionData.currentPage = 1;
    questionData.itemsPerPage = 10;
    questionData.maxSize = 3;
    
     questionData.pageChanged = function() {
         $log.log('Page changed to: ' + questionData.currentPage);
     };
     
     questionData.addToEval=(function(question, evalId, comScore, knoScore){
         var promise = questionsService.addQuestionToEval(question,evalId,comScore,knoScore);
         promise.then(function(result){
             questionData.search = [result];
             $log.log(questionData.search);
         });
     });

    questionData.getQuestions=(function(input){
        var promise = questionsService.getQuestions(input);
        promise.then(function(result){
            questionData.search = result;
            $log.log(questionData.search);
        });
    });

    questionData.searchForQuestions = (function(input1,input2){
        var promise = questionsService.searchForQuestions(input1,input2);
        promise.then(function(result){
            questionData.search = result;
            $log.log(questionData.search);
        });
    });

    questionData.addNewQuestion = (function(maxCS, maxKS, qText, subjectId){
        var promise = questionsService.addNewQuestion(maxCS, maxKS, qText, subjectId);
        promise.then(function(result){
            var endResult = "Question: " +result.id+ " -ADDED";
            questionData.search = [endResult];
            $log.log(questionData.search);
        });
    });

    questionData.updateQuestion = (function(id, maxCS, maxKS, qText, subjectId){
        var promise = questionsService.updateQuestion(id, maxCS, maxKS, qText, subjectId);
        promise.then(function(result){
            questionData.search = [result];
            $log.log(questionData.search);            
        });
    });

    questionData.deleteQuestion = (function(id){
        questionData.delete = questionsService.deleteQuestion(id);
    });    
}]);