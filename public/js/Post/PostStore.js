var Backbone = require('backbone');
var _ = require('underscore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var POSTS = require('../constants').POSTS;
var PostCollection = require('./PostCollection');



var PostStore = _.extend({}, Backbone.Events);
_.extend(PostStore, {
  posts: new PostCollection,
  getPosts: function() {
		return this.posts.toJSON();
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
  // Define what to do for certain actions
  switch(payload.actionType) {
    case POSTS.FETCH_SINGLE:
        var post_id = payload.post_id;
        fetch('api/posts/' + post_id, {
          method: 'GET'
        })
        .then(res => res.json())
        .catch(err => {
        });
        break;

    case POSTS.CREATE:
      var content = payload.text;
      console.log(payload.text);
      var creator = window.storyboard.user._id;
      var newPost = this.posts.add({
        creator : creator,
        text: content,
        timePosted: Date.now()
      });
      newPost.url = '/api/posts';
      // save to server
        newPost.save(null, {
          success: function(post, response, options) {
            // success
            console.log('the post said ' + response.text + ' ' + response._id);
            console.log('successful post creation in front-end');
            newPost.set('_id', response._id);
            newPost.set('creator', response.creator);
            console.log(response.creator.username);
            newPost.set('text', content);
            newPost.set('timePosted', response.timePosted);
            this.trigger(POSTS.CHANGE_ALL);
          }.bind(this),
          error: function(collection, response, options) {
            console.log('error saving the new post');
          }
        });
      break;
      case POSTS.FRONTPAGE_POSTS:
      var userID = window.storyboard.user._id;
      this.posts.url = '/api/users/' + userID + '/frontpage';
      console.log(this.posts.url);
      this.posts.fetch({
        success: function(collection, response, options) {
          console.log('successfully fetched' +  collection.length + 'frontpage posts');
          this.trigger(POSTS.CHANGE_ALL);
        }.bind(this),
        error: function(collection, response, options) {
          console.log('error fetching frontpage posts');
        }
      });
      break;

  }
  // If action was acted upon, emit change event
  PostStore.emitChange();
  return true;
}
});

var dispatchToken = AppDispatcher.register(PostStore.handleDispatch.bind(PostStore));
PostStore.dispatchToken = dispatchToken;

module.exports = PostStore;

