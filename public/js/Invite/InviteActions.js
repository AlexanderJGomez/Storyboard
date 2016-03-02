var AppDispatcher = require('../dispatcher/AppDispatcher');
var INVITES = require('../constants').INVITES;

var InviteActions = {
	request: function(targetid) {
		AppDispatcher.dispatch({
			actionType: INVITES.REQUEST,
			target: targetid
		})
	},
	accept: function(originid) {
		actionType: INVITES.ACCEPT,
		origin: originid
	},
	getGetInvites: function() {
		actionType: INVITES.GET_INVITES
	}
}

module.exports = InviteActions;