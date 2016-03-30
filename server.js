//REQUIREMENTS
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var passport = require('passport');
var passportLocal = require('passport-local');
var session = require('express-session');
var key = process.env.LEAGUE_CLIENT_ID;
var request = require('request');

// var route = require('angular-route');

//setting up port/DB, requiring mongoose
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/champs';

//pass port config load
require('./config/passport')(passport);


//middleware
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(methodOverride('_method'));

//passport middleware
var passport = require('passport');

var session = require('express-session');

app.use(session({name: 'champs_stat_auth_app', secret: 'leagueofdraven'}));
app.use(passport.initialize());
app.use(passport.session());

//controllers
// var userController = require('./controllers/userController.js');
// app.use('/user', userController);

//AJAX call to RIOT API
app.get('/getdata/', function(req, res){
  request({
    url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key='+key,
    method: 'GET',
  }, function(error, response, body){
  	// console.log("Here's the response: ", response);
  	console.log("Here's the body: ", body)
      res.send(body)
  });
});

app.get('/getdata/:id', function(req, res){
  request({
    url: "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + req.params.id + "?champData=all&api_key=" + key,
    method: 'GET',
}, function(error, response, body){
  	// console.log("Here's the response: ", response);
  	console.log("Here's the body: ", body)
      res.send(body)
  });
});

var champController = require('./controllers/champController.js');
app.use('/champ', champController);

var userController = require('./controllers/userController.js');
app.use('/user', userController);

//mongoose
mongoose.connect(mongoURI);

mongoose.connection.on('error', function(){
	console.log('MONGO not connected');
})

//port
mongoose.connection.once('open', function(){
		console.log('MONGO connected');
		app.listen(port, function(){
		console.log("Listening on port:" + port);
	});
});