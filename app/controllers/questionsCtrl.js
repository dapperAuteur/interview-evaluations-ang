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

angular.module('myApp').controller('QuestionsCtrl', function(questionsService,$log){
    var questionData = this;

    questionData.search = [];
    questionData.delete;
    
    questionData.currentPage = 1;
    questionData.itemsPerPage = 10;
    questionData.maxSize = 3;
    
     questionData.pageChanged = function() {
         $log.log('Page changed to: ' + questionData.currentPage);
     };

    questionData.getQuestions=(function(input){
        questionData.search = questionsService.getQuestions(input);
    });

    questionData.searchForQuestions = (function(input1,input2){
        questionData.search = questionsService.searchForQuestions(input1,input2);
    });

    questionData.addNewQuestion = (function(maxCS, maxKS, qText, subjectId){
        questionData.search = questionsService.addNewQuestion(maxCS, maxKS, qText, subjectId);
    });

    questionData.deleteQuestion = (function(id){
        questionData.delete = questionsService.deleteQuestion(id);
    });

    questionData.updateQuestion = (function(id, maxCS, maxKS, qText, subjectId){
        questionData.search = questionsService.updateQuestion(id, maxCS, maxKS, qText, subjectId);
    });
    
});