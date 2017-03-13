'use strict';

// Create a person:
angular.module('myApp').controller('CreateCtrl', function($http) {
	
	var myData = this;
	
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
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
		  
	  } else if (typeof input1 !== 'undefined' && typeof input2 !== 'undefined' && role.title === "Choose role") {
		  
		  console.log("first and last only");
		    $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1 + "&lastname=" +input2
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data;
		        console.log("success " + response.data.content);

		      }, function(response){
		        console.log("fail " + response);
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
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
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
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
		  
	  } else if (typeof input1 !== 'undefined' && typeof input2 === 'undefined' && role.title === "Choose role") {
		  
		  console.log("first");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?firstname=" + input1
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
		  
	  } else if (typeof input1 === 'undefined' && typeof input2 !== 'undefined' && role.title === "Choose role") {
		  
		  console.log("last");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons?lastname=" + input2
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
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
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
		      });
	  }else if (typeof input1 === 'undefined' && typeof input2 === 'undefined' && role.title === "Choose role"){
		  console.log("ALL SEARCH");
		  $http({
		        method: "GET",
		        url: "//localhost:8080/api/v1/persons"
		        
		      }).then(function(response){
		        console.log(response);
		        myData.persons = response.data.content;
		        console.log("success " + response.data);

		      }, function(response){
		        console.log("fail " + response);
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
					console.log("success");
					myData.showUpdater=false;
				},
				function(response) {
					myData.alert("failure to update");
				}
			);		
	}
  
  // big long function to delete
  
  // THIS DOES NOT WORK!
  myData.deletePerson = function(del){
	  myData.uJson = del;
	  myData.deletee = JSON.stringify(myData.uJson);
	  console.log(myData.updated);
	  $http.delete("//localhost:8080/api/v1/persons", myData.deletee)
	  .then(
			  function(response) {
				  console.log("success");
				  myData.showUpdater=false;
			  },
			  function(response) {
				  myData.alert("failure to update");
			  }
	  );		
  }
});