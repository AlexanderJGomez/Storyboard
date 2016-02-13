var Backbone = require('backbone');
var PostModel = require('./PostModel');

var PostCollection = Backbone.Collection.extend({
  model: PostModel,
  url: "/api/posts"
});

module.exports = PostCollection;