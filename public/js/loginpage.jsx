var React = require('react');
var _ = require('underscore');
var {Button, Form, Input} = require('react-bootstrap');
var UserStore = require('./User/UserStore');
var UserActions = require('./User/UserStore');

var LoginPage = React.createClass({
	getInitialState: function() {
            return {
                password: '',
                username: ''  
            };
        },
    handleUsername : function() {
        this.setState({username : this.refs.Username.getValue()});
    },
    handlePassword : function() {
        this.setState({password: this.refs.Password.getValue()});
    },
    signIn: function() {
        UserActions.login();
    },
    render: function() {
        if(!_.isEmpty(window.storyboard.user)) {
            return <p>you are already logged in </p>
        }
        else {
        return (
            <div >
                <div>
                    <Input
                        type="text"
                        value={this.state.username}
                        placeholder="Username"
                        label="Username"
                        hasFeedback
                        ref="Username"
                        onChange={this.handleUsername} 
                    />
                </div>
                <div>
                    <Input
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        label="Password"
                        hasFeedback
                        ref="Password"
                        onChange={this.handlePassword} />
                </div>
                <div>
                    <Button
                    onClick = {this.signIn()} >
                    Submit
                    </Button>
                </div>
            </div>

)};
	}
})

module.exports = LoginPage;