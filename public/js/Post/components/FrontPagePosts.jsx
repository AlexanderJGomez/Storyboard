var React = require('react');
var Post = require('./Post');
var username = window.storyboard.user.username;
var _ = require('underscore');
var PostActions = require('./../PostActions');

var FrontPagePosts = React.createClass({
    componentWillMount: function() {
        console.log('component will mount')  
        PostActions.getFrontpagePosts();
        this.setState(this.props);
        console.log(this.props);
    },
    componentWillReceiveProps: function(nextProps) {
        console.log('the frontpage has received the props');
        this.setState(nextProps);
    },
    render: function() {
    	var postNodes = this.state.posts.map(function(post) {
      	return (
          <div key = {post._id} >
        	 <Post author={post.creator.username} text = {post.text} >
        	 </Post>
          </div>
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