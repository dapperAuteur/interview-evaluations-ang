'use strict';
angular.module('myApp').controller('FAQCtrl', function($state){
	var myFaq=this;
	myFaq.projectDesc = true;

	myFaq.togProjDesc = function(){
		myFaq.projectDesc = !myFaq.projectDesc;
	}
	myFaq.arch = false;

	myFaq.togArch = function(){
		myFaq.arch = !myFaq.arch;
	}


});

// var showApp = angular.module('showApp', [])
//
// .controller('mainController', function($scope) {
//
//   $scope.goCats = false;
//
// });
