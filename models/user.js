var mongoose = require('mongoose');
var shortID = require('shortid');

var userSchema = new mongoose.Schema({
	_id : {
		type: String,
		unique: true,
		default: shortID.generate
	},
	userName: {
		type : String,
		required : true,
		unique: true
	},
	joinDate: { type: Date, default: Date.now },
	friends: [{ type: String, ref: 'User', unique: true }],
	profilePicture: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;