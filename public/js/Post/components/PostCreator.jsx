var React = require('react');
var {Button, Input} = require('react-bootstrap');
var PostStore = require('../PostStore');
var PostActions = require('../PostActions');

var PostCreator = React.createClass({
	getInitialState: function() {
            return {
                text: ''
            };
        },
    handleText : function() {
        this.setState({text : this.refs.text.getValue()});
    },
    createPost : function() {
    	PostActions.createPost(this.state.text);
    	this.setState({text: null});
    },
	render: function() {
		return (
			<div>
				<Input
					value = {this.state.text}
					ref = 'text'
					type = 'text'
					onChange = {this.handleText}
				/>
				<Button
					onClick = {this.createPost}
				>
					Submit Post
				</Button>
			</div>
			);
	}
})

module.exports = PostCreator;