var React = require('react');
var ReactDOM = require('react-dom');
var LoginPage = require('./loginpage.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
var router = require('./router');
var RegisterPage = require('./registerpage.jsx');

var App = React.createClass({
    
    render: function() {
    	return <div> <InterfaceComponent/> </div>
    }
});

var InterfaceComponent = React.createClass({
	componentWillMount: function() {
		this.callback = (function() {
			this.forceUpdate();
		}).bind(this);
		router.on('route', this.callback);
	},
	componentWillUnmount: function() {
		router.off('route', this.callback);
	},
	render: function() {
		switch(router.current) {
			case '':
			return <NavPage />;
			case 'home':
			//router.navigate('home', {trigger: true});
			return <HomePage />
			break;
			case 'login':
			//router.navigate('login', {trigger: true});
			return <LoginPage />
			break;
			case 'register':
			//router.navigate('register', {trigger: true});
			return <RegisterPage />
			break;
			default:
			//router.navigate('login', {trigger: true});
			return <LoginPage />
			break;
		}
	}
})

ReactDOM.render(<App />, document.getElementById('app'));