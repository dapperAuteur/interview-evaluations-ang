'use strict';
angular.module('myApp').controller('WikiCtrl', function($state){
	var myWiki=this;
	myWiki.projectDesc = true;

	myWiki.togProjDesc = function(){
		myWiki.projectDesc = !myWiki.projectDesc;
	}
	myWiki.arch = false;

	myWiki.togArch = function(){
		myWiki.arch = !myWiki.arch;
	}


});
