var app = angular.module('champ', ['ngRoute']);

console.log("I WORK CHAMP CONTROLLER")

app.controller('ChampController', ['$http', '$scope', '$rootScope', '$location', function($http, $scope, $rootScope, $location){
	this.loading = true;
	this.champs = [];
	this.champ_id = "";
	var controller = this;
	this.choice = [];
	//CUMULATIVE STATS ARRAYS
	this.totalStats = [];
	this.full = false;
	this.statsObj = {};
	// userID = $rootScope.user._id;

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

								getChamps();
							}
						}
					}
				}
			}
		},
		function(err){
			console.log(err)
		}); //ends HTTP Request

	// + make another HTTP request for champ info based on ID to display on page
	var getChamps = function(){
		$http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + controller.champ_id +"?champData=stats&api_key=d976480e-3f05-49c4-b516-3abb34d75227")
		.then(
			function(response){
				//de-activate loading message
				controller.loading = false;

				controller.champs.push(response.data);
				console.log("this is controller.champs: ", controller.champs)


				getTags();

			},
			function(err){
				console.log(err)
		}); //ends http request
	}//ends getChamps();

	var getTags = function(){
		console.log("Get Tags Fired");
		// $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=tags&api_key=d976480e-3f05-49c4-b516-3abb34d75227")
	}//ends getTags();

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

	//this saves the team to the database
	this.addTeam = function(){
		console.log("This is what's in controller.choice: ", controller.choice)
		var userID = $rootScope.user._id;
		$http.post("/user/" + userID + "/team", {name: this.name, userid: userID, champ: controller.choice, stats: controller.statsObj}).then(
			function(response){
				//redirect to Teams Page
				$location.path('/user/' + userID + '/team') ;
				console.log(response)
			},
			function(err){
				console.log(err)
			});

		console.log(this.name)
		console.log(controller.choice)
	}//ends save()

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

		//if 5 champs are selected, this gives option to save the team
		if (controller.choice.length == 5) {
			controller.full = true;
		} else {
			controller.full = false;
		}
	}; //ends repopulate()

	//this turns angular's numbers in to 2 decimal points
	$scope.formatNumber = function(i) {
	    return Math.round(i * 100)/100; 
	}
	





}]); //ends ChampController
