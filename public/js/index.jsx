var React = require('react');
var ReactDOM = require('react-dom');
var LoginPage = require('./loginpage.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
var router = require('./router');
var RegisterPage = require('./registerpage.jsx');
var NavPage = require('./NavPage');
var HomePage = require('./homepage');

var App = React.createClass({
    
    render: function() {
    	return <div> <InterfaceComponent/> </div>
    }
});

var InterfaceComponent = React.createClass({
	componentWillMount: function() {
		router.on('route', this.callBack);
	},
	callBack: function() {
		this.forceUpdate();
	},
	componentWillUnmount: function() {
		router.off('route', this.callBack);
	},
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
			default:
			return <NavPage />;
			break;
		}
	}
});

ReactDOM.render(<App />, document.getElementById('app'));