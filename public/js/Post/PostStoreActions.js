var AppDispatcher = require('../dispatcher/AppDispatcher');
var CONSTANTS = require('../constants');

var PostStoreActions = {

  loadPosts: function(data) {
    AppDispatcher.handleAction({
      actionType: CONSTANTS.POSTS.LOAD_POSTS,
      data: data
    });
  }
};

module.exports = PostStoreActions;