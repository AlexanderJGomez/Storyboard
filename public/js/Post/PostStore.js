var Backbone = require('backbone');
var _ = require('underscore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var CONSTANTS = require('../constants');

var _posts = {};
// Method to load shoes from action data
function loadPosts(data) {
  _posts = data.posts;
}


var PostStore = _.extend({}, Backbone.Events);
_.extend(PostStore, {
  getPosts: function() {
		return _posts;
	},
  emitChange: function() {
    this.trigger('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;
  // Define what to do for certain actions
  switch(action.actionType) {
    case CONSTANTS.POSTS.LOAD_POSTS:
      // Call internal method based upon dispatched action
      loadPosts(action.data);
      break;

    default:
      return true;
  }
  
  // If action was acted upon, emit change event
  PostStore.emitChange();

  return true;

});

module.exports = PostStore;

