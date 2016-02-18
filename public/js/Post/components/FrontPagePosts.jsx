var React = require('react');
var Post = require('./Post');
var username = window.storyboard.user.username;

var FrontPagePosts = React.createClass({
    render: function() {
    	var postNodes = this.props.data.map(function(post) {
      	return (
        	<Post author={username} key={post._id}>
          		{post.text}
        	</Post>
      );
    });
    return (
      <div className="postList">
        {postNodes}
      </div>
    );
  }
});

module.exports = FrontPagePosts;