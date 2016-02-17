var React = require('react');
var {Input, Button} = require('react-bootstrap');
var UserActions = require('./User/UserActions');
var UserStore = require('./User/UserStore');

var RegisterPage = React.createClass({
	getInitialState: function() {
            return {
                username: '',
                password: ''  
            };
        },
	handleUsername : function() {
        this.setState({username : this.refs.username.getValue()});
    },
    handlePassword : function() {
        this.setState({password: this.refs.password.getValue()});
    },
    register : function() {
    	UserActions.register(this.state.username, this.state.password);
    },
	render: function() {
		return (
		<div> RegisterPage
            <Input
            type="text"
            label="Username"
            placeholder="Enter username"
            ref = 'username'
            onChange = {this.handleUsername} />
			<Input
			type="password"
			label="Password"
			ref = 'password'
			onChange = {this.handlePassword}/>
			<Button
			onClick={this.register}
			>
			Submit
			</Button>
		</div>
		);
	}
})

module.exports = RegisterPage;