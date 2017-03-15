'use strict';
angular.module('myApp').service('mySharedService', function(){

	var sharedService = this;
	sharedService.batchData = [];
	sharedService.newAddedPerson = [];

	sharedService.setbatchData = function(data){
		this.batchData = data;
	};

	sharedService.getbatchData = function(){
		return this.batchData;
	}
	
	sharedService.setNewAddedPerson = function(data){
		this.newAddedPerson.push(data);
	}
	
	sharedService.getNewAddedPerson = function(){
		return this.newAddedPerson;
	}
	
    return sharedService;

});

angular.module('myApp').controller('BatchCtrl', function($httpParamSerializer, $http, mySharedService){
	
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
  
  myData.addMembersToBatch = function(b){
	  myData.newStudents = myData.studentIds.split(",");
  
	  var data = {};
	  data.personIds = myData.newStudents;
	  data = $httpParamSerializer(data);
	  $http.post("//localhost:8080/api/v1/batches/"+b.id+"/members", myData.newStudents).then(function(response){
		  
	  },
	  function(response){
		  
	  });
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
	  
	  //myData.showUpdateFields=true;
	  console.log(b.id);
	  console.log(myData.updatedName);
	  var data = JSON.stringify({
		  name: myData.updatedName,
		  id: b.id
	  });
	  
	  $http.put("//localhost:8080/api/v1/batches", data).then(function(response){
		  
	  },
	  function(response){
		  console.log("failing");
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
	myData.getBatches = function(){
		$http({
		      method: "GET",
		      url: "//localhost:8080/api/v1/batches/"
		    }).then(function(response){
		      
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

