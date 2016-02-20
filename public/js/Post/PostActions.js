var AppDispatcher = require('../dispatcher/AppDispatcher');
var POSTS = require('../constants').POSTS;

var PostActions = {

  loadPosts: function(data) {
    AppDispatcher.dispatch({
      actionType: POSTS.LOAD_POSTS,
      data: data
    });
  },
  fetchSingle: function(post_id) {
    AppDispatcher.dispatch({
      actionType: POSTS.FETCH_SINGLE,
      post_id: post_id
    });
  },
  createPost: function(content) {
    AppDispatcher.dispatch({
      actionType: POSTS.CREATE,
      text: content
    });
  },
  getFrontpagePosts : function()  {
    AppDispatcher.dispatch({
      actionType: POSTS.FRONTPAGE_POSTS
    })
  }
};

module.exports = PostActions;