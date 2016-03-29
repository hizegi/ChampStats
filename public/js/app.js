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


    // var tooltips = document.querySelectorAll('.tooltip span');

    // console.log(tooltips);
    // window.onmousemove = function(e){
    //     var x = (e.clientX + 20) + 'px',
    //         y = (e.clientY + 20) + 'px';

    //         for (var i = 0; i < tooltips.length; i++){
    //             tooltips[i].style.top = y;
    //             tooltips[i].style.left = x;
    //         }
    // }; //ends onmousemove

    // app.directive('tooltip',
    //     function(){
    //         return {
    //             restrict: 'A',
    //             link: function() {
    //                 var tooltipSpan,
    //                     x,
    //                     y;
    //                 //find element that will contain tool tip
    //                 // tooltipSpan = document.getElementById('tooltip-span');
    //                 tooltipSpan = document.getElementsByClassName("tooltip-span");
    //                 // tootipSpan = 
    //                 // console.log(tooltipSpan)
    //                 for(var i=0; i < tooltipSpan.length; i++) {
    //                      //bind mousemove event to the element which wiill show tooltip
    //                      // [id=tooltip]
    //                     $("#tooltip").mousemove(function(e){
    //                         x = e.clientX,
    //                         y = e.clientY;

    //                         //set tool tip based on mouse position
    //                         tooltipSpan[i].style.top = (y + 20) + 'px';
    //                         tooltipSpan[i].style.left = (x + 20) + 'px';

    //                         console.log(tooltipSpan[i].style.top)
    //                     })
    //                 }
                   

    //             }
    //         }
    // });//ends tooltip directive

// });
