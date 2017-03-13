'use strict';
angular.module('myApp').controller('FAQCtrl', function($state){
	var myFaq=this;
	myFaq.projectDesc = false;
	
	myFaq.togProjDesc = function(){
		myFaq.projectDesc = !myFaq.projectDesc;
	}
  
  
});

// var showApp = angular.module('showApp', [])
//
// .controller('mainController', function($scope) {
//
//   $scope.goCats = false;
//
// });
