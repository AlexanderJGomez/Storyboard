var mongoose = require('mongoose');
var shortID = require('shortid');

var postSchema = mongoose.Schema({
	_id : {
		type: String,
		unique: true,
		default: shortID.generate
	},
	creator: {
		type: String,
		ref: 'User'
	},
	text: {
	 type: String,
	 required: true,
	 minlength: 1
	},
	timePosted: { 
		type: Date,
		default: Date.now 
	},
	upVotes: {
		type: Number,
		default: 0
	},
	upVoters: {
		type: [{ type: String, ref: 'User' }],
		default: []
	}
	//comments: [{ type: String, ref: 'Comment' }],
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;


