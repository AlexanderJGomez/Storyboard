var Backbone = require('backbone');
var _ = require('underscore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var INVITES = require('../constants').INVITES;
var InviteCollection = require('./InviteCollection');



var InviteStore = _.extend({}, Backbone.Events);
_.extend(InviteStore, {
  invites: new InviteCollection,
  getInvites: function() {
		return this.invites.toJSON();
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
    
    case INVITES.ACCEPT:
    
    break;
    
    case INVITES.REQUEST:

    var targetID = payload.target;
    var originID = window.storyboard.user._id;
    var newInvite = this.invites.add({
      origin : originID,
      target: targetID
    });
    
    newInvite.url = '/api/invites';
      // save to server
        newInvite.save(null, {
          success: function(invite, response, options) {
            // success
            console.log('success');
            newInvite.set('_id', response._id);
            newInvite.set('origin', response.origin);
            newInvite.set('target', response.target);
            newInvite.set('timeInvited', response.timeInvited);
            this.trigger(INVITES.CHANGE_ALL);
          }.bind(this),
          error: function(collection, response, options) {
            console.log('error saving the new invite');
          }
        });
    break;
    
    case INVITES.GET_INVITES:
    var userID = window.storyboard.user._id;
    console.log('getting invites');
      this.invites.url = '/api/users/'+ userID + '/invites';
      this.invites.fetch({
        success: function(collection, response, options) {
          console.log('successfully fetched ' +  collection.length + ' invite(s)');
          this.trigger(INVITES.CHANGE_ALL);
        }.bind(this),
        error: function(collection, response, options) {
          console.log('error fetching invites');
        }
      });
      break;
    break;
  }
  // If action was acted upon, emit change event
  InviteStore.emitChange();
  return true;
}
});

var dispatchToken = AppDispatcher.register(InviteStore.handleDispatch.bind(InviteStore));
InviteStore.dispatchToken = dispatchToken;

module.exports = InviteStore;