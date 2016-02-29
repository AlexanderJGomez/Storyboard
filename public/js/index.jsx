var React = require('react');
var ReactDOM = require('react-dom');
var LoginPage = require('./loginpage.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
var router = require('./router');
var RegisterPage = require('./registerpage.jsx');
var NavPage = require('./NavPage');
var HomePage = require('./homepage');
var PostStore= require('./Post/PostStore');
var UserStore = require('./User/UserStore');
var _ = require('underscore');
///constants
var POSTS = require('./constants').POSTS;
var USER = require('./constants').USER;
var backgd = {
	backgroundColor: "#eee",
	padding: "20"
}



var change_all_events = [
  POSTS.CHANGE_ALL,
  USER.CHANGE_ALL
].join(' ');


var App = React.createClass({
    
    render: function() {
    	return <div > <InterfaceComponent/> </div>
    }
});

var InterfaceComponent = React.createClass({
	getInitialState: function() {
	    //PostActions.frontPagePosts();
	    return {
	    	posts: [],
	    	user: {}
	    };
	},
	componentDidMount: function() {
		router.on('route', this.callBack);
		PostStore.on(change_all_events, this.postChange);
		UserStore.on(change_all_events, this.userChange);
	},
	componentWillUnmount: function() {
		router.off('route', this.callBack);
    	PostStore.off(change_all_events, this.postChange);
    	UserStore.off(change_all_events, this.userChange);
    },
	callBack: function() {
		this.forceUpdate();
	},
	postChange: function() {
		this.setState(_.extend(this.state, this.getPostState()));
	},
	userChange: function() {
		this.setState(_.extend(this.state, this.getUserState()));
	},
	getPostState : function() {
		console.log('changed post state in the interface component');
		return {
			posts: PostStore.getPosts()
		};
	},
	getUserState : function() {
		return {
			user: UserStore.getUser()
		};
	},
	render: function() {
		switch(router.current) {
			case 'home':
			return <div style = {backgd}><HomePage {...this.state} /> </div>
			break;
			case 'login':
			return <div style = {backgd}><LoginPage /></div>
			break;
			case 'register':
			return <RegisterPage />
			break;
			case '':
			return <NavPage />;
			break;
			default:
			return <NavPage />;
			break;
		}
	}
});

ReactDOM.render(<App />, document.getElementById('app'));