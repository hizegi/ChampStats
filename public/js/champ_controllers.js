var app = angular.module('champ', ['ngRoute']);

console.log("I WORK CHAMP CONTROLLER")

app.controller('ChampController', ['$http', '$scope', function($http, $scope){
	this.loading = true;
	this.champs = [];
	this.champ_id = "";
	var controller = this;
	this.choice = [];
	//CUMULATIVE STATS ARRAYS
	this.totalStats = [];

	this.statsObj = {};

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
											//de-activate loading message
											controller.loading = false;

											controller.champs.push(response.data);
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

		controller.statsObj = {};

		repopulate();

	}//ends showInfo

	//this removes the champ and stats from the side table
	this.remove = function(index){
		console.log(index);
		controller.choice.splice(index, 1);
		controller.totalStats.splice(index, 1);
		controller.statsObj = {};

		repopulate();
	}//ends remove()

	//iterates obj and sums all values
	var repopulate = function() {
		controller.totalStats.forEach(function(obj){
			for (var key in obj) {
				if (obj.hasOwnProperty(key)){
					controller.statsObj[key] = (controller.statsObj[key] || 0) + obj[key];
				}
			}
			// console.log("This is the STATS OBJECT: ", controller.statsObj);
		});
	}; //ends repopulate()

	//this turns angular's numbers in to 2 decimal points
	$scope.formatNumber = function(i) {
	    return Math.round(i * 100)/100; 
	}
	




}]); //ends ChampController
