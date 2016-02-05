var mongoose = require('mongoose');
var shortID = require('shortid');

var inviteSchema = mongoose.Schema({
	_id : {
		type: String,
		unique: true,
		default: shortID.generate
	},
	origin: {
		type: String,
		ref: 'User'
	},
	target: {
		type: String,
		ref: 'User'
	},
	timeInvited: { 
		type: Date,
		default: Date.now 
	}
	//comments: [{ type: String, ref: 'Comment' }],
});

var Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;