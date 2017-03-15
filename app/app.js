'use strict';
var ie = angular.module('myApp', [

  'ui.router',
  'ui.bootstrap'

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
      .state('evaluation', {
        url: '/evaluations',
        templateUrl: 'app/templates/evaluations-tmpl.html'
      })  
      .state('wiki', {
        url: '/wiki',
        templateUrl: 'app/templates/wiki-tmpl.html',
        controller: 'WikiCtrl as wiki'
      })
      .state('questions', {
        url: '/questions',
        templateUrl: 'app/templates/questions-tmpl.html'
      })
      .state('subjects', {
        url: '/subjects',
        templateUrl: 'app/templates/subjects-tmpl.html',
        controller: 'SubjectsCtrl as subjects'
      })
      
    //default routing
    $urlRouterProvider.otherwise('/');
  });

