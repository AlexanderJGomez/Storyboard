var React = require('react');
var {Button} = require('react-bootstrap');
var PostActions = require('../PostActions');
var topStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'flex-start'
};

var postStyle = {
  display: 'flex',
  flexDirection : 'column',
  marginTop: '10',
  marginBottom: '10',
  padding: '20',
  background: "white",
  width: '500'
}
//background: "#eee",
var footerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between'
}

var textWrapper = {
  border: '1px solid',
  padding: '10',
  marginTop: '5',
  marginBottom: '5'
}


var Post = React.createClass({
  deletePost: function() {
    PostActions.deletePost(this.props.post._id);
  },
  upVote: function() {
    if(this.props.post.upVoters.indexOf(window.storyboard.user._id) < 0) {
      PostActions.upVote(this.props.post._id);
    }
  },
  render: function() {
    var datems = Date.now() - Date.parse(this.props.post.timePosted);
    var daysPast = Math.round((((datems / 1000) / 60) / 60) / 24);

    if(this.props.post.creator.username != window.storyboard.user.username) {
      return (
        <div style = {postStyle}>
          <div className="post" style = {topStyle}>
            <h3 className="postAuthor">
              {this.props.post.creator.username} :
            </h3>
          </div>

          <div style = {textWrapper}>
            <p>{this.props.post.text}</p>
          </div>

          <div style = {footerStyle}>
              <p> posted {daysPast} days ago </p>
              <div>
              <p> {this.props.post.upVotes} up votes</p>
              <Button 
              bsSize = 'xs'
              onClick = {this.upVote}
              >
                <i className = 'glyphicon glyphicon-chevron-up' />
              </Button>
              </div>
          </div>
        </div>
    );
    }
    else {
      return (
      <div className="post" style = {postStyle}>
        <div style = {topStyle}>
          <h3 className="postAuthor">
            {this.props.post.creator.username} :
          </h3>
          <Button
            onClick = {this.deletePost}
            bsSize = 'xs'
          >
            <i className = 'glyphicon glyphicon-remove' />
          </Button>
        </div>

        <div style = {textWrapper}>
          <p>{this.props.post.text}</p>
        </div>

        <div style = {footerStyle}>
          <p> {this.props.post.upVotes} up votes</p>
          <p>posted {daysPast} days ago</p>
        </div>
      </div>
    );
    }
  }
});

module.exports = Post;