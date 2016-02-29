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
  },
  deletePost : function(postid) {
    AppDispatcher.dispatch({
      actionType: POSTS.DELETE_POST,
      post_id: postid
    })
  },
  upVote: function(postid) {
    AppDispatcher.dispatch({
      actionType: POSTS.UP_VOTE,
      post_id: postid
    })
  }
};

module.exports = PostActions;