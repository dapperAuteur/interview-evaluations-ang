angular.module('myApp').service('evalTraineeService', function() {
	
	var myData = this;
	myData.trainee = 0;
	
	myData.setTraineeId = function(traineeId) {
		this.trainee = traineeId;
	}
	
	myData.getTraineeId = function() {
		return this.trainee;
	}
	
	return myData;
});