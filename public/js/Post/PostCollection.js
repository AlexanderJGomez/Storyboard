var Backbone = require('backbone');
var PostModel = require('./PostModel');

var PostCollection = Backbone.Collection.extend({
  model: PostModel,
  url: "storyboard.dev/api/posts",
  comparator: function(m) {
        return -Date.parse(m.get('timePosted'));
    }

});

module.exports = PostCollection;