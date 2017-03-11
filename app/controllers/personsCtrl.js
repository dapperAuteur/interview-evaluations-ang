'use strict';

// Create a person:
angular.module('myApp').controller('CreateCtrl', function($http) {
	
	var myData = this;
	
	myData.roles =  [
		{title : "Choose role", id : "0"},
        {title : "Trainee", id : "1"},
        {title : "Trainer", id : "2"}
    ];
	
	myData.save = function(first, last, role) {
		
		console.log(first + " " + last + " " + role.id + " " + role.title);
		
		var personObj = {			
			firstName:first,
			lastName:last,
			personRole:{
				id:role.id,
				title:role.title
			}				
		}
		
		var myJSON = JSON.stringify(personObj);
		
		$http.post("//localhost:8080/api/v1/persons",myJSON)
			.then(
				function(response) {
					console.log("success");
				},
				function(response) {
					console.log("failure");
				}
			);
				
	}
	
});

// View person by name: (May have to change the urls)
angular.module('myApp').controller('ViewPersonsCtrl', function($http){
	
  var myData = this;

  myData.getPerson = function(input1, input2) {
	  
	  console.log(input1 + " " + input2);
	 
	  if (typeof input1 !== 'undefined' && typeof input2 !== 'undefined') {
		  
		  console.log("first and last");
		    $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1 + "&lastname=" +input2
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data;
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
		  
	  } else if (typeof input1 !== 'undefined' && typeof input2 === 'undefined') {
		  
		  console.log("first");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data;
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
		  
	  } else if (typeof input1 === 'undefined' && typeof input2 !== 'undefined') {
		  
		  console.log("last");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?lastname=" + input2
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data;
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
		  
	  }
  }
  
  // View person by id:
  myData.getPersonId = function(input) {
	  
	  $http({
	        method: "GET",
	        url: "//localhost:8080/api/v1/persons/" + input
	        
	      }).then(function(response){
	        console.log(response);
	        myData.personsId = response.data;
	        console.log("success " + response.data);

	      }, function(response){
	        console.log("fail " + response);
	      });
	  
  }
  
});

angular.module('myApp').controller('AllPersonsCtrl', function($http) {
	
	var allData = this;

	allData.getAllPersons = function() {
		
		  console.log("all");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons"
		        
		      }).then(function(response){
		        console.log(response.data.content);
		        allData.persons = response.data.content;	
		        console.log("success " + response.data.content);

		      }, function(response){
		        console.log("fail " + response);
		      });
	  }
	
});

//TODO: Update and Delete 