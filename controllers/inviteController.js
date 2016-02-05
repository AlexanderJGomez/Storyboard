var Invite = require('../models/invite');
var User = require('../models/user');



exports.requestFriend = function(originID, targetID, res, next) {
    Invite.create({
        origin: originID,
        target: targetID
    }, function(err, newInvite) {
        	if(err) {
        		return res.send(err); 
        	}

        	return res.json(newInvite);


        });
}






exports.acceptFriend = function(originID, targetID, res, next) {



    Invite.findOneAndRemove({
    	origin: originID,
    	target: targetID
    }, function(err, invite) {
    	if(err)
    		return res.send(err);

    });


    var userName1 = '';
    User.findByIdAndUpdate(originID, {$addToSet: {"friends" : targetID} }, {new: true},
        function(err, user) {
            if(err)
                return res.send(err);

            userName1 = user.userName;
    });


    var userName2 = '';

    User.findByIdAndUpdate(targetID, {$addToSet: {"friends" : originID} }, {new: true}, 
        function(err, user) {
                    if(err) 
                        return res.send(err);

                    

                    userName2 = user.userName;

            return res.json({
                user1: userName1,
                user2: userName2
            });
        });

}