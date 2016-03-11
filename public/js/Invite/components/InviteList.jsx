var React = require('react');
var InviteActions = require('../InviteActions');

var InviteList = React.createClass({
	componentWillMount: function() {
        console.log('InviteList will mount');  
        InviteActions.getInvites();
        this.setState(this.props);
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    },
	render: function() {
		if(this.state.invites != undefined || this.state.invites != null) {
	    	var inviteNodes = this.state.invites.map(function(invite) {
	      		if(invite.origin == window.storyboard.user._id) {
	      			return (
	      				<div key = {invite._id}>
	      				<p> You invited {invite.target.username} </p>
	      				</div>
	      				);
	      		}
	      		else {
	      			return (
		          <div key = {invite._id} >
		        	 <p> You have a friend request from {invite.origin.username} </p>
		          </div>
	      		);
	      		}
	      	});
			return (
				<div>
				{inviteNodes}
				</div>
			);
		}

		return (
			<div>
			<p> no new invites</p>
			</div>
			);

	}

})

module.exports = InviteList;