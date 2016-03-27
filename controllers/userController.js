var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var Team = require("../models/team.js");
var Champ = require("../models/champ.js");
var passport = require("passport");
var mongoose = require('mongoose');
mongoose.set('debug', true);


//********************
// GET REQUESTS
//********************
router.get('/', function(req, res){
	res.send("Hello World!")
})

//LOGOUT
router.get('/:id/logout', function(req,res){
    console.log("LOGGED OUT!");
    req.logout();
    res.redirect('/');
});

//HOMEPAGE
router.get("/:id", function(req, res){
    User.findById(req.params.id, function(err, user){
        console.log(user);
        res.send(user)
    })
});

//********************
// CREATE 
//********************
//Post new user
router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect : '/signup' // redirect to the signup page if error
            }), function(req, res) {
        console.log('SIGNUP AUTHENTICATION WORKED');
        res.send(req.user);
        console.log("This is req.user being sent back to page", req.user)  //from passport.js
});


//login
router.post('/login', passport.authenticate('local-login',{
    failureRedirect: '/'}), function(req,res){
    console.log('LOGGGED IN, YA');
    res.send(req.user);
});



//new location
router.post('/:id/team', function(req, res){
    console.log('WORKING');
    console.log(req.params.id);
    console.log(req.body);   
    User.findById(req.params.id, function(err, user){
        var newTeam = new Team(req.body);
            console.log("CREATING TEAM: Found USER");
        newTeam.save(function(err){
            
        user.team.push(newTeam);

        console.log("new team saved.. check MONGO");

        //save user
        user.save(function(err, user){
             //send user to client
            res.send(user);
        });
        })
    });
})

//this saves the selected wine and selected location to save to DB
router.post('/:id/addwine', function(req, res){
    console.log("ADDING WINE IS ACCESSED");
    console.log("this was the location id request: ", req.body.locationid);
    console.log("this was the wine request: ", req.body.wine);
    console.log("this was the wine request's NAME: ", req.body.wine.Name);
});


//********************
// UPDATE
//********************

//Put/edit username
router.put('/:id', function(req, res) {
    var newUserName = req.body;
    //     console.log("newUserName", newUserName);
    //     console.log('req.body.username: ', req.body.username);
            User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    res.redirect('/users/' + req.params.id);
    });
});

router.put('/:id/:team_id', function(req,res){
    console.log("EDIT REQUEST RECEIVED")
    Team.findByIdAndUpdate(req.params.team_id, req.body, function(err,team){
        console.log("TEAM NAME: ", team.name);
        console.log("REQ.BODY: ", req.body);
        User.findById(req.params.id, function(err,user){
            console.log(user);
            for (var i = 0; i < user.team.length; i++) {
                if (user.team[i]._id == req.params.team_id) {
                    // user.location[i].name = req.body;
                    console.log('REQ BODY NAME ' + req.body.name);
                    console.log('USER NAME ' + user.team[i].name);
                    user.team[i].name = req.body.name;
                }
            }
            user.save(function(err){
                res.send(user);
            })
        });
    });
});


//********************
// DELETE
//********************

//delete location
router.delete('/:id/:team_id', function(req, res) {
    console.log('Delete TEAM! Check Mongo');
    Team.findByIdAndRemove(req.params.team_id, function(err, team) {
        var teamID = req.params.team_id;
        User.update({}, {$pull: { team : { _id : teamID }}}, {multi : false}, function(err,user){
            console.log(user);
            res.send(user);
        })
    });
});

//delete user
router.delete('/:id', function(req, res) {
    // console.log('Deleted location');
    User.findByIdAndRemove(req.params.id, function(err, user) {
        console.log(user);
        // var locationID = req.params.locat_id;
        // User.update({}, {$pull: { location : { _id : locationID }}}, {multi : false}, function(err,user){
        //     console.log(user);
        //     res.send(user);
        // })
        res.send(user);
    });
});

//this will delete the wine
router.delete('/:id/:location_id/:wineid', function(req, res){
    // console.log("DELETE ROUTE ACCESSED");
    // console.log("this is the user id, ", req.params.id)
    // console.log("this is the location id", req.params.location_id)
    // console.log("this is wineid : ", req.params.wineid);
    var thisLocation = "";

    User.findById(req.params.id, function(err, user){
        Location.findById(req.params.location_id, function(err, location){
            // console.log("Found the user: ", user)
            // console.log("Found the location: ", location)
            //find the location that matches the req.params.location by ID
            for(var i = 0; i < user.location.length; i++){
                //once location matches, search through that location's wines
                if (user.location[i]._id == req.params.location_id){
                    console.log("the location ids matched")
                    console.log("this is the location found, " + user.location[i])
                    console.log("this is the location[i].length; ", user.location[i].wine.length)
                    //search through the wines and find match ID from req.params.wineid
                    for (var j = 0; j < user.location[i].wine.length; j++){
                        console.log("2nd for loop has been fired")
                        //once wine matches, remove that wine
                        if (user.location[i].wine[j]._id == req.params.wineid) {
                            console.log("Found match for wine" , user.location[i].wine[j])
                            user.location[i].wine[j].remove();
                            console.log("here's what location looks like now", user.location[i])
                            //save the user
                            user.save();
                            res.send(user.location[i].wine)
                        }//ends if statement
                    }//ends wine for loop
                }//ends 1st if statement
            }//ends location for loop
        })//ends location 
    })//ends find userById
})//ends router.delete

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    //if user exists, do this
    if (req.isAuthenticated())
        return next();
    // if not
    res.redirect('/');
};

module.exports = router;