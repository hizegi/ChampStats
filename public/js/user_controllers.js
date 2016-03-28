var app = angular.module('profile', ['ngRoute']);

console.log("user controller working");

app.controller('UserController', ['$http', '$scope', '$rootScope', '$location', function($http, $scope, $rootScope, $location){
	var user = $rootScope.user;
	var userID = $rootScope.user._id;
	this.message = false;
	var controller = this;

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

    }
}]);//ends userController();