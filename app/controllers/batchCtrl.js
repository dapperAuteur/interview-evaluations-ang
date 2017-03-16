'use strict';
angular.module('myApp').service('mySharedService', function(){

	var sharedService = this;
	sharedService.batchData = [];

	sharedService.setbatchData = function(data){
		this.batchData = data;
	};

	sharedService.getbatchData = function(){
		return this.batchData;
	}

    return sharedService;

});

angular.module('myApp').controller('BatchCtrl', function($http, mySharedService){

  var myData = this;
  myData.showUpdateFields=false;
 
  myData.getBatches = function(input) {
	  console.log("inside function");
	  console.log(input);
    $http({
      method: "GET",
      url: "//localhost:8080/api/v1/batches/" + input
    }).then(function(response){
    	
      console.log(response);
      myData.batches = response.data;
      console.log(response.data);

    }, function(response){
      console.log(response);
    });
  }
  
  myData.postBatch = function(){
	  myData.showSuccessAlert=false;
	  myData.showFailureAlert=false;
	  console.log(myData.newBatchInput);
	  if(myData.newBatchInput != undefined){
	  var data = JSON.stringify({
		  name: myData.newBatchInput
	  });
	  
	  $http.post("//localhost:8080/api/v1/batches", data).then(function(response){
		  myData.showSuccessAlert=true;
		  myData.requestMessage = "added batch successfully";
	  },
	  function(response){
		  myData.showFailureAlert=true;
		  myData.requestMessage = "unsuccessful in adding batch.";
	  });
  }else{
	  myData.showFailureAlert=true;
	  myData.requestMessage = "unsuccessful in adding batch. enter valid batch name";
  }
  }
 
  myData.deleteBatch = function(input){
	  var number = -1;		
		
	 //dynamically remove table rows upon delete
	  myData.newData = mySharedService.getbatchData();
		for( var index = 0; index < myData.newData.length; index++ ) {
			if( myData.newData[index].id === input.id ) {
				number = index;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		myData.newData.splice( index, 1 );		
	
 
	  
	  console.log(input);

	  $http.delete("//localhost:8080/api/v1/batches//" + input.id)
	  	.then(
			function(response) {
				console.log("successfully deleted " + input.name);
		
			},
			function(response) {
				console.log("failed to delete " + input.name); 
				
			}
		);	

  }  
  myData.addMembersToBatch = function(b){
	  if(myData.studentIds != undefined){
	  myData.newStudents = myData.studentIds.split(",");
  
	  var data = {};
	  data.personIds = myData.newStudents;
	  data = $httpParamSerializer(data);
	  $http.post("//localhost:8080/api/v1/batches/"+b.id+"/members", myData.newStudents).then(function(response){
		 console.log("successfully added members to batch");
	  },
	  function(response){
		  console.log("failure to add members to batch");
	  });
  }
  }
  
  myData.showUpdateBatchInit = function(b){
	  myData.showUpdateFields=true;
	  myData.updatedBranch = b; 
	  console.log(b);
  }
  
  myData.cancelUpdate = function(){
	  myData.showUpdateFields=false;
  }
  
  myData.updateBatch = function(b){
	  
	  console.log(b.id);
	  console.log(myData.updatedName);
	  if(myData.updatedName != undefined){
	  var data = JSON.stringify({
		  name: myData.updatedName
	  });
	
	  $http.put("//localhost:8080/api/v1/batches/"+b.id, data)
	   .then(
	       function(response){
	    	   console.log("successfully updated batch name");
	       }, 
	       function(response){
	    	   console.log("failure to update batch name");
	       }
	    );
  }
  }

});

angular.module('myApp').controller('TabsDemoCtrl', function($http, $scope, $window, mySharedService){
	
	var myData = this;
	myData.getBatches = function(){
		
		myData.newData = mySharedService.getbatchData();
	}
	
	
	
});

angular.module('myApp').controller('getAllBatches', function($rootScope, $http, mySharedService){

	var myData = this;
	$rootScope.showButton = {
		    value  : true
		  };
	
	myData.currentPage = 0;
	myData.pageSize = 20;
	
	myData.getBatches = function(){
		$http({
		      method: "GET",
		      url: "//localhost:8080/api/v1/batches?page=" + myData.currentPage
		    }).then(function(response){
		    	$rootScope.showButton = {
						value  : false
					  };
		      console.log(response);
		      var pages = response.data.totalPages;
		      console.log("pages " + pages);
		      
		      myData.batches = response.data.content;
		      mySharedService.setbatchData(myData.batches);
		      myData.newData = mySharedService.getbatchData();
		      console.log("here:");
		      console.log(myData.newData);

		    }, function(response){
		      console.log(response);
		    });
	}
	
});

angular.module('myApp').controller('UpdateDeleteBatch', function($scope, $window){
	
});

angular.module('myApp').controller('CreateBatch', function($scope, $window){
	
});

angular.module('myApp').controller('addPersonController', function(mySharedService) {

	  
});

