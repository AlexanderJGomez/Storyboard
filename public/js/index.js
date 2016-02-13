var React = require('react');
var ReactDOM = require('react-dom');
var LoginPage = require('./loginpage.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
var router = require('./router');
var RegisterPage = require('./registerpage.jsx');

var App = React.createClass({
    
    render: function() {
    	return <div> <p>{"yo"}</p> <InterfaceComponent/> </div>
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
		//console.log(router.current);
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
			return <LoginPage />
			break;
		}
	}
})

ReactDOM.render(<App />, document.getElementById('app'));