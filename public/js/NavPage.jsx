var React = require('react');

var NavPage = React.createClass({
	render: function() {
		return (
			<div>
			<a href="/login")> Login </a>
		<a href="/register"> Register </a>
		</div>);
}
    
})

module.exports = NavPage;