var React = require('react');
var ReactDOM = require('react-dom');
var LoginPage = require('./loginpage.jsx');

var HelloWorld = React.createClass({
    render: function() {
        return <div>
        	<LoginPage/>
        </div>;
    }
});

ReactDOM.render(<HelloWorld />, document.getElementById('app'));