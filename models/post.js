var mongoose = require('mongoose');
var shortID = require('shortid');

var postSchema = mongoose.Schema({
	_id : {
		type: String,
		unique: true,
		default: shortID.generate
	},
	creator: { type: String, ref: 'User' }
	timePosted: { type: Date, default: Date.now },
	upVotes: {
		type: int,
		default: 0
	},
	upVoters: [{ type: String, ref: 'User' }]
	//comments: [{ type: String, ref: 'Comment' }],
});

var Post = mongoose.model('Post', postSchema);

