var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants');
var USER = constants.USER;

var UserActions = {
	login(username, password) {
		console.log(username + " " + password);
    AppDispatcher.dispatch({
      actionType: USER.LOGIN,
      username: username,
      password: password
    });
  }
};

module.exports = UserActions;