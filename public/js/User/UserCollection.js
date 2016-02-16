
var Backbone = require('backbone');

var UserModel = require('./UserModel');

var UserCollection = Backbone.Collection.extend({
  model: UserModel
});

module.exports = UserCollection;