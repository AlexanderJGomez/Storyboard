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
	storedUser: new UserModel,
  loggedIn: false,
  handleDispatch: function(payload) {
    switch(payload.actionType) {
    	case USER.LOGIN:
        var username = payload.username;
        var password = payload.password;
        this.login(username, password);
        break;
      case USER.REGISTER:
        var username = payload.username;
        var password = payload.password;
        this.register(username, password);
        break;
      }
    UserStore.emitChange();
  },
  emitChange: function() {
    this.trigger('change');
  },
  getUser: function() {
    return this.storedUser.toJSON();
  },
  setUser: function(user) {
    this.storedUser = new UserModel(user);
    this.storedUser.url = 'storyboard.dev/users/' + this.storedUser.get('_id');
    this.trigger(USER.CHANGE_ALL);
  },
  login: function(newusername, newpassword) {
    fetch('/login', {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({
        username: newusername,
        password: newpassword
      })
    }).then(res => res.json())
    .then(res=>{
      console.log('login success');
    })
    .catch(error => {
          console.log('login error', error.toString());
          //this.trigger(USER.REGISTER_ERROR);
        })
  },
  register: function(newusername, newpassword) {
    fetch('/api/users', {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({
        username: newusername,
        password: newpassword
      })
    }).then(res => res.json())
    .then(res=>{
      console.log('register success');
    })
    .catch(error => {
          console.log('register error', error.toString());
          //this.trigger(USER.REGISTER_ERROR);
        })
  }
});



var dispatchToken = AppDispatcher.register(UserStore.handleDispatch.bind(UserStore));
UserStore.dispatchToken = dispatchToken;

module.exports = UserStore;