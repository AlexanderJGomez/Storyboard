var Backbone = require('backbone');
var InviteModel = require('./InviteModel');

var InviteCollection = Backbone.Collection.extend({
  model: InviteModel
});

module.exports = InviteCollection;