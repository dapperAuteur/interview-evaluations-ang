'use strict';
angular.module('myApp').controller('TraineesCtrl', function($http){
	
  var myData = this;

  myData.getTrainees = function(input1, input2) {
	  
	  console.log(input1 + " " + input2);
	 
	  if (typeof input1 !== 'undefined' && typeof input2 !== 'undefined') {
		  
		    $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1 + "&lastname=" +input2
		        
		      }).then(function(response){
		        console.log(response);
		        myData.trainees = response.data;
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
		  
	  } else if (typeof input1 !== 'undefined' && typeof input2 === 'undefined') {
		  
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1
		        
		      }).then(function(response){
		        console.log(response);
		        myData.trainees = response.data;
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
		  
	  } else if (typeof input1 === 'undefined' && typeof input2 !== 'undefined') {
		  
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?lastname=" + input2
		        
		      }).then(function(response){
		        console.log(response);
		        myData.trainees = response.data;
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
	  }

  }
});
