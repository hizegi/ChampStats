var app = angular.module('profile', ['ngRoute']);

console.log("user controller working");

app.controller('UserController', ['$http', '$scope', '$rootScope', '$location', function($http, $scope, $rootScope, $location){
	var user = $rootScope.user;
	var userID = $rootScope.user._id;
	this.message = false;
	var controller = this;
	this.show = false;
	this.aboutme = "";
	this.mainchamp = "";
	this.mainlane = "";

	//grab user data
    $http.get("/user/" + userID).then(function(response){

	    controller.about = response.data.about;
	    controller.main = response.data.main;
	    controller.lane = response.data.lane;

    });

    this.showEdit = function(){
    	controller.show =! controller.show
    }

    //this is to update user info
    this.editUser = function() {
    	console.log("Edit User ACCESSED");
    	console.log(controller.about);
        var userID = $rootScope.user._id;
       
        $http.put('/user/' + userID + '/profile', { about : this.about, main: this.main, lane: this.lane})
        .then(function(response){
            // console.log("This is response.data from put request #1: ", response.data);
        })//ends http put request

        controller.show = false;
    };


	//this deletes the user and all their data
    this.deleteUser = function(){
	    console.log("delete route fired");

	    $http.delete('/user/' + userID).then(function(response){
	        console.log(response);
	        console.log("user has been deleted");
	        $rootScope.user = null;
	        controller.message =  true;

	        setTimeout($location.path('/'), 2000);
	    },
	    function(err){
	        console.log(err);
	    });
	}//ends deleteUser();
}]);//ends userController();