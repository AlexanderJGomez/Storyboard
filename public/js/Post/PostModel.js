// imports
var Backbone = require('backbone');

// backbone model
var PostModel = Backbone.Model.extend({
  idAttribute: '_id'
});

module.exports = PostModel;
