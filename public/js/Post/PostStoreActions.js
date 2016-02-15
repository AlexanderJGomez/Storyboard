var AppDispatcher = require('../dispatcher/AppDispatcher');
var POSTS = require('../constants').POSTS;

var PostStoreActions = {

  loadPosts: function(data) {
    AppDispatcher.dispatch({
      actionType: POSTS.LOAD_POSTS,
      data: data
    }),
    fetchSingle: function(post_id) {
    AppDispatcher.dispatch({
      actionType: POSTS.FETCH_SINGLE,
      post_id: post_id
    });
  };
  }
};

module.exports = PostStoreActions;