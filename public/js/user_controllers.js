var app = angular.module('profile', ['ngRoute']);

console.log("user controller working");

app.controller('UserController', ['$http', '$scope', '$rootScope', '$location', function($http, $scope, $rootScope, $location){
	var user = $rootScope.user;

	    this.deleteUser = function(){
        console.log("delete route fired");


    }
}]);//ends userController();