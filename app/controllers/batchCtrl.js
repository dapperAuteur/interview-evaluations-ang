'use strict';
angular.module('myApp').service('mySharedService', function(){

	var sharedService = {};
	sharedService.batchData = [];
	sharedService.cardData = [];

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
	  console.log(myData.newBatchInput);
	  console.log(myData.firstName);
	  var data = JSON.stringify({
		  name: myData.newBatchInput
	  });
	  
	  $http.post("//localhost:8080/api/v1/batches", data).then(function(response){
		  
	  },
	  function(response){
		  
	  });
  }
  
  myData.updateBatch = function(){
	  console.log(myData.newBatchNameInput);
	  console.log(myData.batchIdInput);
	  var data = JSON.stringify({
		  name: myData.newBatchNameInput,
		  id: myData.batchIdInput
	  });
	  
	  $http.put("//localhost:8080/api/v1/batches", data).then(function(response){
		  
	  },
	  function(response){
		  
	  });
  }
});

angular.module('myApp').controller('TabsDemoCtrl', function($http, $scope, $window, mySharedService){
	
	var myData = this;
	myData.getBatches = function(){
		myData.newData = mySharedService.getbatchData();
	}
	
	
	
});

angular.module('myApp').controller('getAllBatches', function($http, mySharedService){

	var myData = this;
	
	myData.currentPage = 0;
	myData.pageSize = 20;
	
	myData.getBatches = function(){
		$http({
		      method: "GET",
		      url: "//localhost:8080/api/v1/batches?page=" + myData.currentPage
		    }).then(function(response){
		      
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

	  this.choices = [];
	  
	  this.addNewChoice = function() {
	    var newItemNo = this.choices.length+1;
	    this.choices.push({'id':'choice'+newItemNo});
	  };
	  
	  this.removeChoice = function() {
		    var lastItem = this.choices.length-1;
		    this.choices.splice(lastItem);
		  };
});

