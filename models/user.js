var mongoose = require("mongoose");
var teamSchema = require("./team.js").schema;
var bcrypt = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({

	username: String,
	email: String,
	password: String,
	team: [teamSchema],
	about: String,
	main: String,
	lane: String

});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model("userSchema", userSchema);