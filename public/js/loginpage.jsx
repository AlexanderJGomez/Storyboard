var React = require('react');
var _ = require('underscore');

var LoginPage = React.createClass({
	render: function() {
        if(!_.isEmpty(window.storyboard.user)) {
            return <p>you are already logged in </p>
        }
        else {
        return (
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

)};
	}
})

module.exports = LoginPage;