var React = require('react');
var _ = require('underscore')
var PostCreator = require('./Post/components/PostCreator');
var FrontPagePosts = require('./Post/components/FrontPagePosts');

var HomePage = React.createClass({
	
	render : function() {
		console.log('re-rendered homepage');
		if(_.isEmpty(window.storyboard.user)) {
			return <p> Go sign in noob</p>;
		}
		else {
			return (
				<div> 
					<p> Welcome to the homepage {window.storyboard.user.username} </p>
					<PostCreator/>
					<FrontPagePosts {...this.props}/>
				</div>
			 );
		}
	}
})

module.exports = HomePage;