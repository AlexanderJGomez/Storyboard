var Backbone = require('backbone');
var _ = require('underscore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var CONSTANTS = require('../constants');
var PostCollection = require('./PostCollection');

var _posts = {};
// Method to load shoes from action data
function loadPosts(data) {
  _posts = data.posts;
}


var PostStore = _.extend({}, Backbone.Events);
_.extend(PostStore, {
  posts: new PostCollection,
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
  },
  handleDispatch: function(payload) {
  var action = payload.action;
  var text;
  // Define what to do for certain actions
  switch(action.actionType) {
    case POSTS.FETCH_SINGLE:
        var post_id = payload.post_id;
        fetch('storyboard.dev/api/posts/' + post_id, {
          method: 'GET'
        })
        .then(res => res.json())
        .catch(err => {
        });
        break;
    case POSTS.LOAD_POSTS:
      // Call internal method based upon dispatched action
      loadPosts(action.data);
      break;
    default:
      return false;
  }
  // If action was acted upon, emit change event
  PostStore.emitChange();
  return true;
}
});

var dispatchToken = AppDispatcher.register(PostStore.handleDispatch.bind(PostStore));
PostStore.dispatchToken = dispatchToken;

module.exports = PostStore;

