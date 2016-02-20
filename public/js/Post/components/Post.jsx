var React = require('react');

var Post = React.createClass({
  render: function() {
    return (
      <div className="post">
        <h1 className="postAuthor">
          {this.props.author} :
        </h1>
        <p>{this.props.text}</p>
      </div>
    );
  }
});

module.exports = Post;