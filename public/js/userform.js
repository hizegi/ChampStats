var app = angular.module('user-form', ['ngRoute', 'ngCookies']);

app.controller('FormController',['$http', '$scope', '$location', '$rootScope', '$routeParams', '$cookies', function($http, $scope, $location, $rootScope, $routeParams, $cookies){ //location changes the hash values in the url
    var controller = this;
    this.password = null;
    this.id = $routeParams.id;

    //this is for NEW SIGN UP USERS
    $scope.addUser = function() {
        var uname = $scope.username;
        var pword = $scope.password;
        var email = $scope.email;
        console.log('USER NAME ' + uname);
        console.log('PASSWORD ' + pword);
        console.log('EMAIL:', email);

        //POST THE USER INFO
        $http.post('/user/signup', {username : uname, password : pword, email : email}).then(function(response){

            var userID = response.data._id;

            //This will now post to the user ID
            $location.path('/user/' + response.data._id); //will change the URL hash value to to /root/user ... same as window.location.hash = '#/user' ... no hash needed, b/c 'path' automatically knows we're working with angular    

             //once user is signed up, pull up user info immediately        
            $http.get("/user/" + userID).then(function(response){
                // console.log("This is the response.data.username ", response.data.username);
                // console.log("This is the username through Scope", $scope.username);
                $rootScope.user = response.data;  
            })
        },
        function(err){
            alert('ERROR: That Username is already taken');
            console.log(err);
        });

    };


    $scope.loginUser = function() {
    //need to run an ajax POST call to authenticate user name and password and have the server authenticate then
    //$rooteScope is a super global variable ... attaches all of your properties to a global object
        var email = $scope.email;
        var pword = $scope.password;

        $http.post('/user/login', {email: email, password : pword}).then(function(response){
            
            // console.log(response.data); //looking for req.user.id here? We need the server to auth and then we need to grab this somehow
            var userID = response.data._id;
            // console.log(controller)
            //This will now post to the user ID
            $location.path('/user/' + response.data._id); //will change the URL hash value to to /root/user ... same as window.location.hash = '#/user' ... no hash needed, b/c 'path' automatically knows we're working with angular    
            
            //once user is loggedin, pull up user info immediately        
            $http.get("/user/" + userID).then(function(response){

                $rootScope.user = response.data;
            })
        },
        function(err){
            console.log(err);
        });
    }; //END loginUser function

    $rootScope.logoutUser = function() {
        var user = $rootScope.user;
        // console.log(user._id);
        // console.log('LOGOUT WORKING');
        $http.get('/user/' + user._id + '/logout').then(function(response){
            // console.log(response);
            $rootScope.user = null;
        },
        function(err){
            console.log(err);
        });
    } //End log out user

    //delete user
    $rootScope.deleteUser = function(){
        // console.log("user was deleted");
        // console.log($rootScope.user)
        var userDeleteID = $rootScope.user._id;
        $http.delete('/user/' + userDeleteID).then(function(response){
            // console.log(response);
            // alert('Yuh hilarious');
            $rootScope.user = null;
        },
        function(err){
            console.log(err);
        });

    }

}]); //END Form Controller

app.directive('userForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/userform.html',
        controller: 'FormController',
        controllerAs: 'formCtrl'
    }
}); //END form directive

app.directive('loginForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/userloginform.html',
        controller: 'FormController',
        controllerAs: 'formCtrl'
    }
});


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true});
    $routeProvider
    .when('/delete', {
        templateUrl: 'partials/delete.html',
        controller: 'FormController', 
        controllerAs: 'formCtrl'
    })
.when('/user/login', {
        templateUrl: 'partials/userloginform.html',
        controller: 'FormController', 
        controllerAs: 'formCtrl'
    }).otherwise({
        redirectTo: '/'
    });
}]);