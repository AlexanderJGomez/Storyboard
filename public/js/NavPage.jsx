var React = require('react');
var {Button} = require('react-bootstrap');
var Router = require('./router');

var NavPage = React.createClass({
	onLoginClick: function() {
		Router.navigate('login', {trigger: true});
	},
	onRegisterClick: function() {
		Router.navigate('register', {trigger: true});
	},
	render: function() {
		return (
			<div>
			<Button 
			onClick={this.onLoginClick}>
			Login 
			</Button>
			<p></p>
			<Button 
			onClick={this.onRegisterClick}>
			Register
			</Button>
		</div>);
}
    
});

module.exports = NavPage;