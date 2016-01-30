var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Storyboard');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});

var connection = mongoose.connection;
connection.on('error', console.error.bind(console,
	"connection error:"));

connection.once('open', function() {
	console.log('connected to database');
});

