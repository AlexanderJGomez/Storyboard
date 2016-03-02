var React = require('react');
var _ = require('underscore');
var {Button} = require('react-bootstrap');
var PostCreator = require('./Post/components/PostCreator');
var FrontPagePosts = require('./Post/components/FrontPagePosts');
var Router = require('./router');

var newStyle = {
	marginLeft: 'auto',
	marginRight:'auto',
	display: 'flex',
	flexDirection: 'column'
};
var LogOutStyle = {
	marginTop: '0',
	marginRight:'0',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-start',
	justifyContent: 'flex-end'
}

var backgd = {
	backgroundColor: "#eee",
	padding: "20",
	display: 'flex',
	flexDirection: 'column'
}

var limitWidth = {
	width: '500',
	marginRight: 'auto',
	marginLeft: "auto"

}

var HomePage = React.createClass({
	logOut : function() {
		Router.navigate('/logout', {trigger: true});
	},
	goToLogin: function() {
		Router.navigate('/login', {trigger: true});
	},
	render : function() {
		console.log('re-rendered homepage');
		if(_.isEmpty(window.storyboard.user)) {
			return (
				<div>
				<p> Go sign in noob</p>
				<Button
				onClick = {this.goToLogin}> Go to login
				</Button>
				</div>
			);
		}
		else {
			return (
				<div style ={backgd}>
					<div style = {LogOutStyle}>
							<form action="/logout" method="get">
                    		<div>
                        		<input type="submit" value="LOG OUT"/>
                   			</div>
                			</form>
					</div>

					<div style = {newStyle}> 
						<div style = {limitWidth}>
						<p> Welcome to the homepage {window.storyboard.user.username} </p>
						<PostCreator/> 
						</div>
						<FrontPagePosts {...this.props}/>
					</div>

				</div>
			 );
		}
	}
})

module.exports = HomePage;