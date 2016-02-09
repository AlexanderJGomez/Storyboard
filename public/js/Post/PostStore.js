var Backbone = require('backbone');
var _ = require('underscore');
var AppDispatcher = require('../dispatcher/AppDispatcher');


var PostStore = _.extend({}, Backbone.Events);
_.extend(PostStore, {
	myPosts: new Posts,
	active: new Post,

	handleDispatch(payload) {
    switch(payload.actionType) {
    };
}});

var dispatchToken = Dispatcher.register(PostStore.handleDispatch.bind(PostStore));
PostStore.dispatchToken = dispatchToken;

module.exports = PostStore;

