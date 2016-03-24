
var app = angular.module("champApp", []);
// var app = angular.module("champApp", ["ngRoute", "user-form", "location-form", 'main']);


app.controller('ChampController', ['$http', function($http){
	this.champs = [];
	this.champ_id = "";
	var controller = this;
	this.choice = [];
	//CUMULATIVE STATS ARRAYS
	this.totalStats = [];

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

	//HTTP Request to RIOT API
	// + get champ ID
	// + make another HTTP request for champ info based on ID to display on page
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
								// console.log(controller.champ_id)


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
		}); //ends HTTP Request

	//this will add the champ to the champ side table, prevents duplicates
	// + push stats info to be accumulated
	this.showInfo = function(champ){
		if ((controller.choice.indexOf(champ.key) == -1) && (controller.choice.length < 5)) {
			controller.choice.push(champ.key)
		}

		if ((controller.totalStats.indexOf(champ.stats) == -1) && (controller.totalStats.length < 5)) {
			controller.totalStats.push(champ.stats)
			console.log("this is totalStats array: ", controller.totalStats)
		}

	}//ends showInfo

	//this removes the champ and stats from the side table
	this.remove = function(index){
		console.log(index)
		controller.choice.splice(index, 1)
		controller.totalStats.splice(index, 1)
	}




}]); //ends ChampController


// 1. if i click on a champ, his picture and stats will show up on the sidebar
// 2. How to do this? 
// 3. On click, I can push the info into arrays by index
// 4. but once i click, it has to be subtracted again
// display sum of array [2, 4, 5]


