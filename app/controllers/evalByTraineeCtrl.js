/**
 * 
 */
angular.module('myApp').controller('EvalTraineeController', function(evalTraineeService) {
	
	var myData = this;
	myData.param = evalTraineeService.getTraineeId();
	console.log(myData.param);
	
	
	
});