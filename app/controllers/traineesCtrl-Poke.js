'use strict';
angular.module('myApp').controller('TraineesCtrl', function($http){

  var myData = this;

  myData.getPokemon = function(input) {

    $http({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/" + input + "/"
    }).then(function(response){
      console.log(response);
      myData.pokemon = response.data;
      console.log("success " + response.data);

    }, function(response){
      console.log("failure " + response);
    });
  }
});
