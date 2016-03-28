
var app = angular.module('champApp', ['ngRoute', 'champ', 'user-form', 'team', 'profile']);

console.log("app.js i work");
// var app = angular.module("champApp", ["ngRoute", "user-form", "location-form", 'main']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true }); // tell angular to use push state
    $routeProvider.
        when('/teams', {
            templateUrl: 'partials/teams.html',
            controller: 'TeamController',
            controllerAs: 'TeamCtrl'
        }).
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'ChampController',
            controllerAs: 'ChampCtrl'
        }).
        when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'ChampController',
            controllerAs: 'ChampCtrl'
        }).
        when('/login', {
            templateUrl: 'partials/userloginform.html',
            controller: 'FormController',
            controllerAs: 'FormCtrl'
        }).
        when('/user/:id', {
            templateUrl: 'partials/main.html',
            controller: 'FormController', 
            controllerAs: 'formCtrl'
	    }).
	    when('/user/:id/team', {
		    templateUrl: 'partials/teams.html',
		    controller: 'TeamController', 
		    controllerAs: 'teamCtrl'
	    }).
        when('/team/:id/', {
            templateUrl: 'partials/teams.html',
            controller: 'TeamController', 
            controllerAs: 'teamCtrl'
        }).
        when('/user/:id/profile', {
            templateUrl: 'partials/profile.html',
            controller: 'UserController', 
            controllerAs: 'UserCtrl'
        }).
        when('/user/:id/profile/edit', {
            templateUrl: 'partials/profileEdit.html',
            controller: 'UserController', 
            controllerAs: 'UserCtrl'
        })
        
}]);