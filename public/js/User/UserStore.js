var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

var AppDispatcher = require('../dispatcher/AppDispatcher');

var constants = require('../constants');
var USER = constants.USER;

var UserCollection = require('./UserCollection');
var UserModel = require('./UserModel');
var user = window.storyboard.user;

var UserStore = _.extend({}, Backbone.Events);
_.extend(UserStore, {
	user: new UserModel,
  loggedIn: false,
  handleDispatch: function(payload) {
    switch(payload.actionType) {
    	case USER.LOGIN:
        var username = payload.username;
        var password = payload.password;
        this.login(username, password);
        break;
    }
    UserStore.emitChange();
},
emitChange: function() {
    this.trigger('change');
},
login: function(username, password) {
    //this.trigger(USER.LOGGING_IN);
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log('login success', res.user._id);
      // set the new user
      this.setUser(res.user);
      // trigger success
      //this.trigger(USER.LOGIN_SUCCESS);
    })
    .catch(err => {
      console.log('login error', err.toString());
      //this.trigger(USER.LOGIN_ERROR, err.toString());
    });
  },
  setUser: function(user) {
    this.user = new UserModel(user);
    this.user.url = 'storyboard.dev/users/' + this.user.get('_id');
    //this.trigger(USER.CHANGE_ALL);
  }
});



var dispatchToken = AppDispatcher.register(UserStore.handleDispatch.bind(UserStore));
UserStore.dispatchToken = dispatchToken;

module.exports = UserStore;