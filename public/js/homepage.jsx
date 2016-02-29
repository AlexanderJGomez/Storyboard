var React = require('react');
var _ = require('underscore');
var {Button} = require('react-bootstrap');
var PostCreator = require('./Post/components/PostCreator');
var FrontPagePosts = require('./Post/components/FrontPagePosts');
var Router = require('./router');

var newStyle = {
	marginLeft: 'auto',
	marginRight:'auto',
	maxWidth: '500'
};
var toolBarStyle = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-start',
	justifyContent: 'flex-end'
}
var HomePage = React.createClass({
	logOut : function() {
		Router.navigate('/logout', {trigger: true});
	},
	render : function() {
		console.log('re-rendered homepage');
		if(_.isEmpty(window.storyboard.user)) {
			return <p> Go sign in noob</p>;
		}
		else {
			return (
				<div>
					<div style = {toolBarStyle}>
							<form action="/logout" method="get">
                    		<div>
                        		<input type="submit" value="LOG OUT"/>
                   			</div>
                			</form>
					</div>
					<div style = {newStyle}> 
						<p> Welcome to the homepage {window.storyboard.user.username} </p>
						<PostCreator/>
						<FrontPagePosts {...this.props}/>
					</div>
				</div>
			 );
		}
	}
})

module.exports = HomePage;