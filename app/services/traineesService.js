'use strict';
angular.module('myApp').controller('TraineesCtrl', function($http){

  var myData = this;

  myData.getTrainees = function(input) {

    $http({
      method: "GET",
      url: "//localhost:8080/api/v1/trainees/" + input + "/"
    }).then(function(response){
      console.log(response);
      myData.trainees = response.data;
      console.log("success " + response.data);

    }, function(response){
      console.log("failure " + response);
    });
  }
});
