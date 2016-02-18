var React = require('react');

var Post = React.createClass({
  render: function() {
    return (
      <div className="post">
        <h2 className="postAuthor">
          {this.props.author}
        </h2>
      </div>
    );
  }
});

module.exports = Post;