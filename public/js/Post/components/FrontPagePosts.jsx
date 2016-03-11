var React = require('react');
var Post = require('./Post');
var username = window.storyboard.user.username;
var _ = require('underscore');
var PostActions = require('./../PostActions');

var listStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '1000',
  flexShrink: '.5'
}

var FrontPagePosts = React.createClass({
    componentWillMount: function() {
        console.log('component will mount');  
        PostActions.getFrontpagePosts();
        this.setState(this.props);
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    },
    render: function() {
      var postNodes = this.state.posts.map(function(post) {
      	return (
          <div key = {post._id} >
        	 <Post post = {post} >
        	 </Post>
          </div>
      );
    });
    return (
      <div className="postList" style = {listStyle}>
        {postNodes}
      </div>
    );
  }
});

module.exports = FrontPagePosts;