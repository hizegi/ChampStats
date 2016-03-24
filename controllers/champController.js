var express = require('express');
var router = express.Router();
var Champ = require('../models/champ.js');

router.get('/', function(req, res){
	Champ.find({}, function(err, champs){
		res.json(champs)
	})
})

module.exports = router;

	// var testChamp = new Champ({
	// 	userid: '123dqwe',
	// 	name: 'Ezreal', 
	// 	id: 81,
	// 	key: 'Ezreal',
	// 	title: 'the Prodigal Explorer',
	// 	stats: {
	// 		"armor": 21.88,
	// 		"armorperlevel": 3.5,
	// 		"attackdamage": 55.66,
	// 		"attackdamageperlevel": 2.41,
	// 		"attackrange": 550,
	// 		"attackspeedoffset": 0,
	// 		"attackspeedperlevel": 2.8,
	// 		"crit": 0,
	// 		"critperlevel": 0,
	// 		"hp": 484.4,
	// 		"hpperlevel": 80,
	// 		"hpregen": 6.42,
	// 		"hpregenperlevel": 0.55,
	// 		"movespeed": 325,
	// 		"mp": 360.6,
	// 		"mpperlevel": 42,
	// 		"mpregen": 8.09,
	// 		"mpregenperlevel": 0.65,
	// 		"spellblock": 30,
	// 		"spellblockperlevel": 0
	// 		}
	// });

	// testChamp.save(function(err,data){
	// 	res.send('champ is created')
	// })