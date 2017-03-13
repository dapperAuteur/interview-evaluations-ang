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
      .state('batch', {
        url: '/batch',
        templateUrl: 'app/templates/batch-tmpl.html',
        controller: 'BatchCtrl as batch'
      })
      .state('evaluation', {
        url: '/evaluations',
        templateUrl: 'app/templates/evaluations-tmpl.html'
      })
      .state('faq', {
        url: '/faq',
        templateUrl: 'app/templates/faq-tmpl.html',
        controller: 'FAQCtrl as faq'
      })
      .state('question', {
        url: '/questions',
        templateUrl: 'app/templates/questions-tmpl.html',
        controller: 'QuestionsCtrl as questions'
      })
      .state('subjects', {
        url: '/subjects',
        templateUrl: 'app/templates/subjects-tmpl.html',
        controller: 'SubjectsCtrl as subjects'
      })
      .state('trainees', {
        url: '/trainees',
        templateUrl: 'app/templates/trainees-tmpl.html',
        controller: 'TraineesCtrl as trainees'
      })
      .state('trainers', {
        url: '/trainers',
        templateUrl: 'app/templates/trainers-tmpl.html',
        controller: 'TrainersCtrl as trainers'
      });

    //default routing
    $urlRouterProvider.otherwise('/');
  });

  // angular.module('myApp').controller('MainCtrl', function($scope) {
  //
  // });
