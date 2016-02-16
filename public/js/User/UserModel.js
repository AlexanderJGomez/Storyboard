var Backbone = require('backbone');

var UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  initialize() {
    
  }
});

module.exports = UserModel;