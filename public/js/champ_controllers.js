var app = angular.module('champ', ['ngRoute']);

console.log("I WORK CHAMP CONTROLLER")

app.controller('ChampController', ['$http', '$scope', '$rootScope', '$location', '$anchorScroll', '$timeout', function($http, $scope, $rootScope, $location, $anchorScroll, $timeout){
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

	//HTTP Request to SERVER > RIOT API
	// + get champ ID
	$http.get('/getdata')
	.then(function(response){
		console.log("This is the response: ", response)
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
	}, function(err){
		console.log("This is the error: ", err)
	});

	// + make another HTTP request for champ info based on ID to display on page
	var getChamps = function(){
	$http.get('/getdata/' + controller.champ_id)
		.then(function(response){
			// console.log("Response #2: ", response);
			controller.loading = false;
			controller.champs.push(response.data);
		}, function(err){

		});
	}

	//this will add the champ to the champ side table, prevents duplicates
	// + push stats info to be accumulated
	this.showInfo = function(champ){
		if ((controller.choice.indexOf(champ.key) == -1) && (controller.choice.length < 5)) {
			controller.choice.push(champ.key)
		}

		if ((controller.totalStats.indexOf(champ.stats) == -1) && (controller.totalStats.length < 5)) {
			controller.totalStats.push(champ.stats)
			// console.log("this is totalStats array: ", controller.totalStats)
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
		var goHere = this.name;
		$http.post("/user/" + userID + "/team", {name: this.name, userid: userID, champ: controller.choice, stats: controller.statsObj}).then(
			function(response){

					//once successful, reroute to teams to #TEAMNAME just created
			          $location.path('/user/' + userID + '/team') ;

			          $timeout(function() {
			             $anchorScroll(goHere);
			          }, 1000);

				// console.log(response)
			},
			function(err){
				console.log(err)
			});

		// console.log(this.name)
		// console.log(controller.choice)
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
	
	$scope.filterOptions = {
		champ: [
		{id: 2, name: 'Show All', tags: "all"},
		{id: 3, name: 'Marksman', tags: "Marksman"},
		{id: 4, name: 'Mage', tags: "Mage"},
		{id: 5, name: 'Fighter', tags: "Fighter"},
		{id: 6, name: 'Tank', tags: "Tank"},
		{id: 7, name: 'Support', tags: "Support"},
		{id: 8, name: 'Assasin', tags: "Assassin"}
		]
	};

	$scope.filterItem = {
		tag: $scope.filterOptions.champ[0]
	};

	//this is a custom filter to filter by Champ Role
	$scope.customFilter = function (data) {

				var tagName = data.tags[0];
				var secondTag = data.tags[1];

			    if ((tagName == $scope.filterItem.tag.tags) || (secondTag == $scope.filterItem.tag.tags)) {
			      return true;
			    } else if ($scope.filterItem.tag.tags == "all") {
			      return true;
			    } else {
			      return false;
			    }
		
	  };  


}]); //ends ChampController