var React = require('react');
var {Button} = require('react-bootstrap');
var PostActions = require('../PostActions');
var divStyle = {
  background: "#eee",
  padding: "20px",
  margin: "10px"
};

var deleteStyle = {
  float: 'right'
}

var upvoteStyle = {
  float: 'right'
}

var Post = React.createClass({
  deletePost: function() {
    PostActions.deletePost(this.props.post._id);
  },
  render: function() {
    if(this.props.post.creator.username != window.storyboard.user.username) {
      return (
      <div className="post" style = {divStyle}>
        <h3 className="postAuthor">
          {this.props.post.creator.username} :
        </h3>
        <p>{this.props.post.text}</p>
        <div style = {upvoteStyle}>
          <Button bsSize = 'xs'>
          <i className = 'glyphicon glyphicon-chevron-up' />
          </Button>
        </div>

      </div>
    );
    }
    else {
      return (
      <div className="post" style = {divStyle}>
        <div style = {deleteStyle}>
          <Button
            onClick = {this.deletePost}
            bsSize = 'xs'
          >
            <i className = 'glyphicon glyphicon-remove' />
          </Button>
        </div>
        <h3 className="postAuthor">
          {this.props.post.creator.username} :
        </h3>
        <p>{this.props.post.text}</p>
      </div>
    );
    }
  }
});

module.exports = Post;