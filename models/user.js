var mongoose = require('mongoose');
var shortID = require('shortid');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
	_id : {
		type: String,
		unique: true,
		default: shortID.generate
	},
	username: {
		type : String,
		required : true,
		unique: true
	},
	password : {
		type: String,
		required: true
	},
	joinDate: { type: Date, default: Date.now },
	friends: [{ type: String, ref: 'User'}],
	profilePicture: String
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;