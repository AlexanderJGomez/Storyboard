var React = require('react');
var _ = require('underscore');
var {Button, Input, ButtonInput} = require('react-bootstrap');
var UserStore = require('./User/UserStore');
var UserActions = require('./User/UserStore');
var Router = require('./router');

var LoginPage = React.createClass({
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
    signIn: function() {
        UserActions.login(this.state.username, this.state.password);
        Router.navigate('/home', {trigger: true});
    },
    render: function() {
        if(!_.isEmpty(window.storyboard.user)) {
            return <p>you are already logged in </p>
        }
        else {
            
        return (
            <div >
                <form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Log In"/>
                    </div>
                </form>
            </div>);
    }

    }
})

module.exports = LoginPage;