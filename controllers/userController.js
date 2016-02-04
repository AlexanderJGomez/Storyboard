var User = require('../models/user');




exports.create = function(req, res, next) {


        //console.log(req.body);
        if(req.body.userName == undefined) {
            return {error : 'error'};
        }
        var user = {
        	userName: req.body.userName
        };

        console.log(user);
        // save the bear and check for errors
        User.create(user, function(err, newUser) {
            if (err)
                return res.send(err);

            return res.json(newUser);
        });
    }

exports.getUsers = function(req, res, next) {
    User.find(function(err, users) {
            if (err)
                return res.send(err);

            return res.json(users);
        });
}

exports.findUser = function(req, res, next){
    User.findById(req.params._id, function(err, user) {
            if (err)
                return res.send(err);

            return res.json(user);
        });
}


exports.updateUser = function(id, userMap, res, next) {
        // use our user model to find the bear we want
        User.findByIdAndUpdate(id, userMap, {new: true}, function(err, user) {
            if(err) 
            return res.send(err);

        return res.json(user);
        });

}




exports.removeUser = function(req, res, next) {
    User.remove({
            _id: req.params._id
        }, function(err, user) {
            if (err)
                return res.send(err);

            return res.json({ message: 'Successfully deleted' });
        });
}

