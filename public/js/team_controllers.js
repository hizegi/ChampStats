var app = angular.module('team', ['ngRoute']);

console.log("Team controllers is working");

app.controller('TeamController', ['$http', '$scope', '$rootScope', '$location', function($http, $scope, $rootScope, $location){
	var controller = this;
	var userID = $rootScope.user._id;
	this.teams = [];
	this.message = "Hello";
    this.name = "";

	//grab all the teams from the user, push it into the locations array []
    $http.get("/user/" + userID).then(function(response){

    	// console.log("This is the response: ", response)
        //for each team in the array, push each team to array
        for (var i = 0; i < response.data.team.length; i++) {
            controller.teams.push(response.data.team[i])
            // console.log("This is what I pushed in: ", response.data.team[i])
            // console.log("This is the teams array: ", controller.teams)
        }

    })

    //this turns angular's numbers in to 2 decimal points
    $scope.formatNumber = function(i) {
        return Math.round(i * 100)/100; 
    }

    this.editTeam = function(teamid) {


        console.log(teamid);

        // console.log($scope.locationCtrl.locations[index]._id);

        var teamID = teamid;
        var userID = $rootScope.user._id;
       
       console.log("this is this: ", this)
        $http.put('/user/' + userID + '/' + teamID, { name : this.name})
        .then(function(response){
            console.log(response);
        //     $http.get("/user/" + userID).then(function(response){
        //     $scope.locationCtrl.locations[index].name = response.data.location[index].name;
            
        // })

        }, function(err){
            console.log(err);
        });

    }


}]);//ends TeamController()