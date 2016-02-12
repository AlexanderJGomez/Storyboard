var React = require('react');
var ReactDOM = require('react-dom');
var LoginPage = require('./loginpage.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
var router = require('./router');

var App = React.createClass({
    
    render: function() {
    	return <InterfaceComponent/>;
    }
});

var InterfaceComponent = React.createClass({
	render: function() {
		switch(router.current) {
			case 'home':
			return <HomePage />
			break;
			case 'login':
			return <LoginPage />
			break;
			case 'register':
			return <RegisterPage />
			break;
			case 'forgot':
			return <ForgotPage />
			break;
			default:
			return <LoginPage />
			break;
		}
	}
})

ReactDOM.render(<App />, document.getElementById('app'));