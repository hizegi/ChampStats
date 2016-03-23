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
    failureRedirect : '/TESTPAGE' // redirect to the signup page if error
            }), function(req, res) {
        console.log('SIGNUP AUTHENTICATION WORKED');
        res.send(req.user);
        console.log("This is req.user being sent back to page", req.user)  //from passport.js
});


//login
router.post('/login', passport.authenticate('local-login',{
    failureRedirect: '/TESTPAGE'}), function(req,res){
    console.log('LOGGGED IN, YA');
    res.send(req.user);
});

//search results
router.post('/search', function(req, res){
    console.log("this is SEARCH: req.body.input ", req.body.input)
    res.send(req.body.input)
})

//new location
router.post('/:id/location', function(req, res){
    console.log('WORKING');
    console.log(req.params.id);
    console.log(req.body);   
    User.findById(req.params.id, function(err, user){
        var newLocation = new Location(req.body);
            console.log("new location ");
        newLocation.save(function(err){
            
        user.location.push(newLocation);
        // var bla = User.Location;
        //  bla.push(newLocation);
        console.log("new location added");
        //push location into locations.user
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

    User.findById(req.params.id, function(err, user){

        //     console.log("Found user: ", user);
            // console.log("Found location: ", location);
            var newWine = new Wine({
                name: req.body.wine.Name,
                url: req.body.wine.Url,
                onHand: 0,
                userId: req.params.id,
                type: req.body.wine.Varietal.Name
            })

            //save the new Wine
            newWine.save(function(err, wine){
                console.log("WINE WAS SAVED, CHECK MONGO")
             })//ends newWine.save

            console.log(user.location)

            //for every location this user has, push the wine into this location
            for (var i = 0; i < user.location.length; i++){
                if (user.location[i]._id == req.body.locationid){
                    user.location[i].wine.push(newWine);
                }
            }

            //save the user
            user.save();    

            
    })//ends find User by ID
})//ends router.post


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

router.put('/:id/:location_id', function(req,res){
    Location.findByIdAndUpdate(req.params.location_id, req.body, function(err,location){
        console.log(location.name);
        console.log(req.body);
        User.findById(req.params.id, function(err,user){
            console.log(user);
            console.log(user.location.length);
            for (var i = 0; i < user.location.length; i++) {
                if (user.location[i]._id == req.params.location_id) {
                    // user.location[i].name = req.body;
                    console.log('REQ BODY NAME ' + req.body.name);
                    console.log('USER NAME ' + user.location[i].name);
                    user.location[i].name = req.body.name;
                }
            }
            user.save(function(err){
                res.send(user);
            })
        });
    });
});

//increment wine
router.put('/:id/:location_name/:wine_index', function(req,res){
    User.findById(req.params.id, function(err,user){
        // console.log('THIS IS OUR USER >>>>>>' + user);
        // console.log('THIS OUR USERS LOCs ' + user.location);
        for (var i = 0; i < user.location.length; i++) {
            if (user.location[i].name == req.params.location_name) {
                // console.log(user.location[i].name);
                // console.log(user.location[i].wine.length);
                // console.log(user.location[i].wine[req.params.wine_index]);
                // console.log(user.location[i].wine[req.params.wine_index].onHand);
                user.location[i].wine[req.params.wine_index].onHand += 1;
                user.save(function(err){
                    res.send(user);
                });
            };
        };
    });
});

//decrement wine
router.put('/decrement/:id/:location_name/:wine_index', function(req,res){
    User.findById(req.params.id, function(err,user){
        // console.log('THIS IS OUR USER /////' + user);
        // console.log('THIS OUR USERS LOCs //////' + user.location);
        for (var i = 0; i < user.location.length; i++) {
            if (user.location[i].name == req.params.location_name) {
                // console.log(user.location[i].name);
                // console.log(user.location[i].wine.length);
                // console.log(user.location[i].wine[req.params.wine_index]);
                // console.log(user.location[i].wine[req.params.wine_index].onHand);
                if (user.location[i].wine[req.params.wine_index].onHand == 0) {
                    res.send(user);
                } else {
                user.location[i].wine[req.params.wine_index].onHand -= 1;
                    user.save(function(err){
                        res.send(user);
                    });
                }
            };
        };
    });
});
//********************
// DELETE
//********************

//delete location
router.delete('/:id/:location_id', function(req, res) {
    // console.log('Deleted location');
    Location.findByIdAndRemove(req.params.location_id, function(err, location) {
        var locationID = req.params.location_id;
        User.update({}, {$pull: { location : { _id : locationID }}}, {multi : false}, function(err,user){
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

//////////
//OLD CODE
//////////
//WORK ON THIS
// router.get('/validate', function(req, res) {
//     if (req.isAuthenticated()) {
//         res.redirect('/users/' + req.user.id);
//     } else {
//         res.redirect('/users');
//     }
// });

// // JSON
// router.get('/json', function(req, res) {
//     User.find({}, function(err, data) {
//         res.send(data);
//     });
// });  
// router.get("/:id", function(req, res) {
//     //if user logged in matches req.params.id
//     // res.locals.login = req.isAuthenticated();
//         //find THAT user by ID
//         console.log("This is the req.params.id", req.params.id)
//         User.findById(req.params.id, function(err, data) { //curlies?
//             //send back user object
//             res.send(data);
//             console.log("This is the user", data);
//         });
// });

//Post new user
// router.post('/', passport.authenticate('local-signup', {
//     failureRedirect : '/users' // redirect to the signup page if error
//             }), function(req, res) {
//         res.redirect('/users/' + req.user.id);  //from passport.js
// });
//edit location
// router.put('/:id/location', function(req, res){
//         console.log(req.params.id);
//         Location.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//     res.redirect('/users/' + req.params.id);
//     });
// });