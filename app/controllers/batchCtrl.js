'use strict';
angular.module('myApp').controller('BatchCtrl', function($http){

  var myData = this;
  console.log("outside function");
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

angular.module('myApp').controller('TabsDemoCtrl', function($scope, $window){
	
});

angular.module('myApp').controller('getAllBatches', function($scope, $window, $http){
	var batchData = this;
	batchData.getBatches = function(){
		$http({
		      method: "GET",
		      url: "//localhost:8080/api/v1/batches/"
		    }).then(function(response){
		      console.log(response.data.content);
		      console.log("gets here");
		      batchData.batches = response.data.content;
		      console.log(batchData.batches);

		    }, function(response){
		      console.log(response);
		    });
	}
	
});

angular.module('myApp').controller('UpdateDeleteBatch', function($scope, $window){
	
});

angular.module('myApp').controller('CreateBatch', function($scope, $window){
	
});

angular.module('myApp').controller('addPersonController', function() {

	  this.choices = [{id: 'choice1'}, {id: 'choice2'}];
	  
	  this.addNewChoice = function() {
	    var newItemNo = this.choices.length+1;
	    this.choices.push({'id':'choice'+newItemNo});
	  };
	  
	  this.removeChoice = function() {
		    var lastItem = this.choices.length-1;
		    this.choices.splice(lastItem);
		  };
});

