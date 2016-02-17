var React = require('react');
var _ = require('underscore')
var PostStore = require('./Post/PostStore');
var PostActions = require('./Post/PostActions');

var HomePage = React.createClass( {
	render : function() {
		if(_.isEmpty(window.storyboard.user)) {
			return <p> Go sign in noob</p>;
		}
		else {
			return <div> Welcome to the homepage {window.storyboard.user.username} </div>;
		}
	}
})

module.exports = HomePage;