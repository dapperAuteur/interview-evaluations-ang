'use strict';
var ie = angular.module('myApp', [
  //external
  'ui.router',
  'ui.bootstrap'

  //internal
  // 'dateDirective'
  // 'HomeCtrl',

]);
  ie.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/templates/home-tmpl.html',
        controller: 'HomeCtrl as home'
      })
       .state('persons', {
        url: '/persons',
        templateUrl: 'app/templates/persons-tmpl.html'
        	
      })
      .state('batch', {
        url: '/batch',
        templateUrl: 'app/templates/batch-tmpl.html',
        controller: 'BatchCtrl as batch'
      })
      .state('evaluations', {
        url: '/evaluations',
        templateUrl: 'app/templates/evaluations-tmpl.html',
        controller: 'EvaluationsCtrl as evaluations'
      })
      .state('faq', {
        url: '/faq',
        templateUrl: 'app/templates/faq-tmpl.html',
        controller: 'FAQCtrl as faq'
      })
      .state('questions', {
        url: '/questions',
        templateUrl: 'app/templates/questions-tmpl.html',
        controller: 'QuestionsCtrl as questions'
      })
      .state('subjects', {
        url: '/subjects',
        templateUrl: 'app/templates/subjects-tmpl.html',
        controller: 'SubjectsCtrl as subjects'
      })

    //default routing
    $urlRouterProvider.otherwise('/');
  });

  // angular.module('myApp').controller('MainCtrl', function($scope) {
  //
  // });
