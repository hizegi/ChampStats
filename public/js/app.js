
var app = angular.module("champApp", []);
// var app = angular.module("champApp", ["ngRoute", "user-form", "location-form", 'main']);

app.controller('ChampController', ['$http', function($http){
	this.champs = [];
	this.champ_id = "";
	var controller = this;

	// $http.get('/champ').then(
	// 	//success
	// 	function(response){
	// 		// controller.champs = response.data;
	// 		// console.log(response.data)
	// 	},
	// 	//error
	// 	function(err){
	// 		console.log(err)
	// 	});

	$http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=d976480e-3f05-49c4-b516-3abb34d75227")
	.then(
		function(response){

			for (var key in response.data.data){
				if (response.data.data.hasOwnProperty(key)){
					var obj = response.data.data[key];
					for (var prop in obj) {
						if (obj.hasOwnProperty(prop)){
							if (prop == "id"){
								controller.champ_id = obj[prop]
								console.log(controller.champ_id)
								// controller.champ_ids.push(obj[prop]);
								// console.log(controller.champ_ids);


								$http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + controller.champ_id +"?champData=stats&api_key=d976480e-3f05-49c4-b516-3abb34d75227")
									.then(
										function(response){
											controller.champs.push(response.data);

											// console.log(controller.champ_ids)

										},
										function(err){
											console.log(err)
									}); //ends http request


							}
						}
					}
				}
			}
		},
		function(err){
			console.log(err)
		});





}]);



