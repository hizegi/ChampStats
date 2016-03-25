
var app = angular.module('champApp', ['ngRoute', 'champ', 'user-form']);

console.log("i work");
// var app = angular.module("champApp", ["ngRoute", "user-form", "location-form", 'main']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true }); // tell angular to use push state
    $routeProvider.
        when('/teams', {
            templateUrl: 'partials/teams.html',
            controller: 'ChampController',
            controllerAs: 'ChampCtrl'
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
        })
}]);