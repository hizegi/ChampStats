var app = angular.module('team', ['ngRoute']);

console.log("Team controllers is working");

app.controller('TeamController', ['$http', '$scope', '$rootScope', '$location', function($http, $scope, $rootScope, $location){
	var controller = this;
	var userID = $rootScope.user._id;
	this.teams = [];
	this.message = "Hello";

	//grab all the teams from the user, push it into the locations array []
    $http.get("/user/" + userID).then(function(response){

    	// console.log("This is the response: ", response)
        //for each team in the array, push it to this.locations[]
        for (var i = 0; i < response.data.team.length; i++) {
            controller.teams.push(response.data.team[i].name)
            console.log(response.data.team[i].name)
        }
    })



}]);//ends TeamController()