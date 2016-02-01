var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Storyboard');
var shortID = require('shortid');



var connection = mongoose.connection;
connection.on('error', console.error.bind(console,
	"connection error:"));

connection.once('open', function() {
	console.log('connected to database');
});










