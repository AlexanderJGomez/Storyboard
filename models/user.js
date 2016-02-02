var mongoose = require('mongoose');
var shortID = require('shortid');

var userSchema = new mongoose.Schema({
	_id : {
		type: String,
		unique: true,
		default: shortID.generate
	},
	firstName: String,
	lastName: String,
	joinDate: { type: Date, default: Date.now },
	friends: [{ type: String, ref: 'User' }],
	posts: [{ type: String, ref: 'Post' }],
	profilePicture: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;