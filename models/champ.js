var mongoose = require("mongoose");

var champSchema = new mongoose.Schema({

	userid: String,
	name: String, 
	id: Number,
	key: String,
	title: String,
	stats: {}

});

module.exports = mongoose.model("champSchema", champSchema);