'use strict';

// Create a person:
angular.module('myApp').controller('CreateCtrl', function($http, $timeout) {
	
	var myData = this;
	myData.showCreator = false;
	
	myData.roles =  [
		{title : "Choose role", id : "0"},
        {title : "Trainee", id : "1"},
        {title : "Trainer", id : "2"},
        {title : "QC", id : "3"}
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
					console.log(response);
					console.log("success");
					
					myData.createdName = first + " " + last;					
					myData.showCreator = true;
					$timeout(myData.setFalseShowCreator, 3000);
				},
				function(response) {
					console.log("failure create");
				}
			);		
	}
	
	myData.setFalseShowCreator = function(){
		myData.showCreator = false;
	}
	
});

// View person by name: (May have to change the urls)
angular.module('myApp').controller('ViewPersonsCtrl', function($http, $timeout, $window){
	
  var myData = this;
  
  myData.roles =  [
	  {title : "Choose role", id : "0"},
      {title : "Trainee", id : "1"},
      {title : "Trainer", id : "2"},
      {title : "QC", id : "3"}
  ];

  myData.getPerson = function(input1, input2, role) {

	  console.log(input1 + " " + input2 + " " + role.title);
	 
	  if (typeof input1 !== 'undefined' && typeof input2 !== 'undefined' && role.title !== "Choose role") {
		  
		  console.log("first and last and role");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1 + "&lastname=" +input2 +"&roleName="+role.title
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success search " + response.data);

		      }, function(response){
		        console.log("fail search " + response);
		      });
		  
	  } else if (typeof input1 !== 'undefined' && typeof input2 !== 'undefined' && role.title === "Choose role") {
		  
		  console.log("first and last only");
		    $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1 + "&lastname=" +input2
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data;
		        console.log("success search " + response.data.content);

		      }, function(response){
		        console.log("fail search " + response);
		      });
		  
	  } else if (typeof input1 !== 'undefined' && typeof input2 === 'undefined' && role.title !== "Choose role") {
		  
		  console.log("first and role");
		  $http({
		        method: "GET",
		        //persons?firstname=efren&roleName=trainer
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1 + "&roleName="+role.title
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success search " + response.data);

		      }, function(response){
		        console.log("fail search " + response);
		      });
		  
	  } else if (typeof input1 === 'undefined' && typeof input2 !== 'undefined' && role.title !== "Choose role") {
		  
		  console.log("last and role");
		  $http({
		        method: "GET",
		        //persons?firstname=efren&roleName=trainer
		        url: "//localhost:8080/api/v1/persons?lastname=" + input2 + "&roleName="+role.title
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success search" + response.data);

		      }, function(response){
		        console.log("fail search " + response);
		      });
		  
	  } else if (typeof input1 !== 'undefined' && typeof input2 === 'undefined' && role.title === "Choose role") {
		  
		  console.log("first");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success search " + response.data);

		      }, function(response){
		        console.log("fail search " + response);
		      });
		  
	  } else if (typeof input1 === 'undefined' && typeof input2 !== 'undefined' && role.title === "Choose role") {
		  
		  console.log("last");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?lastname=" + input2
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success search " + response.data);

		      }, function(response){
		        console.log("fail search " + response);
		      });
		  
	  } else if (typeof input1 === 'undefined' && typeof input2 === 'undefined' && role.title !== "Choose role"){
		  console.log("role");
		  $http({
		        method: "GET",
//		        ?roleName=trainer
		        url: "//localhost:8080/api/v1/persons?roleName=" + role.title
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success search " + response.data);

		      }, function(response){
		        console.log("fail search " + response);
		      });
	  }else if (typeof input1 === 'undefined' && typeof input2 === 'undefined' && role.title === "Choose role"){
		  console.log("ALL SEARCH");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons"
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success search " + response.data);

		      }, function(response){
		        console.log("fail search " + response);
		      });
	  }
	  
  }
  
  myData.updatePerson = function(input){
	  myData.showUpdater = true;
	  myData.updatee = input;
	  console.log(myData.updatee);
  }
  
  myData.cancelUpdatePerson = function(){
	  myData.showUpdater = false; 
  }
  
  // big long function to update
  myData.submitUpdatePerson = function(updatee, newFirstName, newLastName, selectedRole){
	  myData.uJson = updatee;
	  console.log("inputPerson");
	  console.log(updatee);
	  console.log("uJson");
	  console.log(myData.uJson);
	  if(newFirstName){
		  myData.uJson.firstName = newFirstName;
	  }
	  if(newLastName){
		  myData.uJson.lastName = newLastName;
	  }
	  
	  console.log(selectedRole.title);
	  if(selectedRole.title !== "Choose role"){
		  
		  if(selectedRole.title === "Trainee"){
			  myData.uJson.personRole.id = 1;
			  myData.uJson.personRole.title = "trainee";
		  } else if(selectedRole.title === "Trainer"){
			  myData.uJson.personRole.id = 2;
			  myData.uJson.personRole.title = "trainer";
		  } else if(selectedRole.title === "QC"){
			  myData.uJson.personRole.id = 3;
			  myData.uJson.personRole.title = "qc";
		  }   
	  }
	  
	  
	  myData.updated = JSON.stringify(myData.uJson);
	  console.log(myData.updated);
	  $http.put("//localhost:8080/api/v1/persons", myData.updated)
	  	.then(
				function(response) {
					console.log("success update");
					myData.showUpdater=false;
				},
				function(response) {
					myData.alert("failure to update");
				}
			);		
	}
  
  // big long function to delete
  
  myData.deletePerson = function(del){
	  
	  myData.delId = del.id;
	  
	  $http.delete("//localhost:8080/api/v1/persons/" + myData.delId)
	  	.then(
			function(response) {
				console.log("success " + myData.delId);
				
				myData.deletedName = del.firstName + " " + del.lastName;				
				myData.showDeleter = true;				
				$timeout(myData.setFalseShowDeleter, 3000);
				
			},
			function(response) {
				console.log("fail " + myData.delId); 
				
			}
		);	

  }
  
	myData.setFalseShowDeleter = function(){
		myData.showDeleter = false;
	}
});

angular.module('myApp').controller('TestCtrl', function() {
	
	var self = this;
	
	self.alert= function() {
		console.log("confirmed");
	}
	
});