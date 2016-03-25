var app = angular.module('team', ['ngRoute']);

console.log("Team controllers is working");

app.controller('TeamController', ['$http', '$scope', '$rootScope', '$location', function($http, $scope, $rootScope, $location){
	var controller = this;
	var userID = $rootScope.user._id;
	this.teams = [];
	this.stats = [];
	this.message = "Hello";

	//grab all the teams from the user, push it into the locations array []
    $http.get("/user/" + userID).then(function(response){

    	// console.log("This is the response: ", response)
        //for each team in the array, push each team to array
        for (var i = 0; i < response.data.team.length; i++) {
            controller.teams.push(response.data.team[i])
            console.log("This is what I pushed in: ", response.data.team[i])
            console.log("This is the teams array: ", controller.teams)
        }

        // //for each team in the array, push teams stats into array
        // for (var i = 0; i < response.data.team.length; i++) {
        //     controller.teams.push(response.data.team[i].stats)

        //     console.log("This is the stats array: ", controller.stats)
        // }

    })



}]);//ends TeamController()