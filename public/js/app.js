
var app = angular.module("champApp", []);
// var app = angular.module("champApp", ["ngRoute", "user-form", "location-form", 'main']);

app.controller('ChampController', ['$http', function($http){
	this.champs = [];
	var controller = this;

	$http.get('/champ').then(
		//success
		function(response){
			// controller.champs = response.data;
			console.log(response.data)
		},
		//error
		function(err){
			console.log(err)
		});

	$http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/81?champData=stats&api_key=d976480e-3f05-49c4-b516-3abb34d75227")
		.then(
			function(response){
				controller.champs.push(response.data);
				console.log(response.data)
			},
			function(err){
				console.log(err)
		});
}]);

