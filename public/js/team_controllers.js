var app = angular.module('team', ['ngRoute']);

console.log("Team controllers is working");

app.controller('TeamController', ['$http', '$scope', '$rootScope', '$location', function($http, $scope, $rootScope, $location){
	var controller = this;
    var user = $rootScope.user;
	var userID = $rootScope.user._id;
	this.teams = [];
	this.message = "Hello";
    this.name = [];
    this.hasTeams = controller.teams.length;

	//grab all the teams from the user, push it into the locations array []
    $http.get("/user/" + userID).then(function(response){

    	// console.log("This is the response: ", response)
        //for each team in the array, push each team to array
        for (var i = 0; i < response.data.team.length; i++) {
            controller.teams.push(response.data.team[i])
            // console.log("This is what I pushed in: ", response.data.team[i])
            // console.log("This is the teams array: ", controller.teams)
        }

    });

    //this turns angular's numbers in to 2 decimal points
    $scope.formatNumber = function(i) {
        return Math.round(i * 100)/100; 
    };

    //this is to update Team Name
    this.editTeam = function(teamid, index) {

        var teamIndex = index;
        var teamID = teamid;
        var userID = $rootScope.user._id;
       
        $http.put('/user/' + userID + '/' + teamID, { name : this.name[teamIndex]})
        .then(function(response){
            // console.log("This is response.data: ", response.data);
            // console.log("This is the controller.teams: ", controller.teams)
            $http.get("/user/" + userID).then(function(response){

            // console.log("FOUND USER: ", response)

            for (var i = 0; i < controller.teams.length; i++){

                if (controller.teams[i]._id == teamid){
                    console.log("MATCH FOUND, response teamID: ", response.data.team[i]._id)
                    console.log("MATCH FOUND, ctrller. teamID: ", controller.teams[i]._id)
                    console.log("MATCH FOUND, Team Name: ", response.data.team[i].name)

                    controller.teams[i].name = response.data.team[i].name
                }
            }
        })

        }, function(err){
            console.log(err);
        });
    }

    //this deletes a team by ID
    this.deleteTeam = function(teamid, index){
    var userID = $rootScope.user._id;
    var teamID = teamid;

    console.log("This is teamId: ", teamID);
    console.log("This is the index ", index)

    $http.delete('/user/' + userID + '/' + teamID).then(
        function(response){

            for (var i = 0; i < controller.teams.length; i++){

                if (controller.teams[i]._id == teamid){

                    controller.teams.splice(i, 1);
                }
            }
        },
        function(err){
            console.log(err);
        });
    }


}]);//ends TeamController()