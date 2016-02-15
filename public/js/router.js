var Backbone = require('backbone');
var _ = require('underscore');

var Router = Backbone.Router.extend({
	routes: {
		'home' : 'home',
		'login' : 'login',
		'register' : 'register'
	},
	home() {
		console.log('sup');
		this.current = 'home';
	},
	login() {
		this.current = 'login';
	},
	register() {
		this.current = 'register';
	}
});

function checkUser() {
  //console.log(window.bootstrap);
  if(_.isEmpty(window.storyboard.user)) {
    return false
  }
  return true
}

var router = new Router();
module.exports = router;
Backbone.history.start({pushstate : true});