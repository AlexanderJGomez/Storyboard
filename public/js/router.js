var Backbone = require('backbone');
var _ = require('underscore');

var Router = Backbone.Router.extend({
	routes: {
		'home' : 'home',
		'login' : 'login',
		'register' : 'register'
	},
	home: function() {
		console.log('sup');
		this.current = 'home';
		//window.location.reload();
	},
	login: function() {
		console.log('you are visiting the login page right now');
		this.current = 'login';
		//window.location.reload();
	},
	register: function() {
		console.log('you are visiting the register page right now');
		this.current = 'register';
		//window.location.reload();
	}
});


var router = new Router();
module.exports = router;
Backbone.history.start({pushstate : true});