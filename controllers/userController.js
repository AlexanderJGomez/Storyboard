var User = require('../models/user');
var bcrypt = require('bcryptjs');




exports.create = function(req, res, next) {


        //console.log(req.body);
        if(req.body.username == undefined || req.body.password == undefined) {
            return {error : 'error'};
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        var user = {
        	username: req.body.username,
            password: hash
        };

        console.log(user);
        // save the bear and check for errors
        User.create(user, function(err, newUser) {
            if (err)
                return res.send(err);

            return res.json(newUser);
        });
    }

exports.getAllUsers = function(res, next) {
    User.find(function(err, users) {
            if (err)
                return res.send(err);

            return res.json(users);
        });
}

exports.findUser = function(id, res, next){
    User.findById(id, function(err, user) {
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







