var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Storyboard');



var connection = mongoose.connection;
connection.on('error', console.error.bind(console,
	"connection error:"));

connection.once('open', function() {
	console.log('connected to database');
});

var kittySchema = mongoose.Schema({
	name: String
});

var Cat = mongoose.model('Cat', kittySchema);

var kitty = new Cat({ name: 'Zildjian' });

var silence = new Cat({ name: 'Silence'});
console.log(silence.name);
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});

