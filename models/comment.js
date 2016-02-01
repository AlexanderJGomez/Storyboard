/*
var mongoose = require('mongoose');
var shortID = require('shortid');

var commentSchema = mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: shortID.generate
	},
	text: String,
	creator: { type: String, ref: 'User' }

})
*/