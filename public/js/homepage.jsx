var React = require('react');
var _ = require('underscore')

var HomePage = React.createClass( {
	render : function() {
		if(_.isEmpty(window.storyboard.user)) {
			return <p> Go sign in noob</p>;
		}
		else {
			return <div> Welcome to the homepage </div>;
		}
	}
})

module.exports = HomePage;