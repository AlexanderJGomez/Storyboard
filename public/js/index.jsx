var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var injectTapEventPlugin = require("react-tap-event-plugin");
var router = require('./router');


//REACT COMPONENTS
var LoginPage = require('./loginpage.jsx');
var RegisterPage = require('./registerpage.jsx');
var NavPage = require('./NavPage');

//STORES
var HomePage = require('./homepage');
var PostStore= require('./Post/PostStore');
var UserStore = require('./User/UserStore');
var InviteStore = require('./Invite/InviteStore');


///constants
var POSTS = require('./constants').POSTS;
var USER = require('./constants').USER;
var INVITES = require('./constants').INVITES;




var change_all_events = [
  POSTS.CHANGE_ALL,
  USER.CHANGE_ALL,
  INVITES.CHANGE_ALL
].join(' ');


var App = React.createClass({
    componentWillMount: function() {
    	document.body.style.backgroundColor = "#eee";
    	document.body.style.padding = '0';
	},
    render: function() {
    	return <div > <InterfaceComponent/> </div>
    }
});

var InterfaceComponent = React.createClass({
	getInitialState: function() {
	    //PostActions.frontPagePosts();
	    return {
	    	posts: [],
	    	user: {},
	    	invites: []
	    };
	},
	componentDidMount: function() {
		router.on('route', this.callBack);
		PostStore.on(change_all_events, this.postChange);
		UserStore.on(change_all_events, this.userChange);
		InviteStore.on(change_all_events, this.inviteChange)
	},
	componentWillUnmount: function() {
		router.off('route', this.callBack);
    	PostStore.off(change_all_events, this.postChange);
    	UserStore.off(change_all_events, this.userChange);
    	InviteStore.off(change_all_events, this.inviteChange);

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
	inviteChange: function() {
		this.setState(_.extend(this.state, this.getInviteState()));
	},
	getPostState : function() {
		return {
			posts: PostStore.getPosts()
		};
	},
	getInviteState: function() {
		return {
			invites: InviteStore.getInvites()
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
			return <HomePage {...this.state} />
			break;

			case 'login':
			return <LoginPage />
			break;

			case 'register':
			return <RegisterPage />
			break;

			case '':
			return <NavPage />;
			break;

			default:
			return (<NavPage />);
			break;
		}
	}
});

ReactDOM.render(<App />, document.getElementById('app'));