var Post = require('../models/post');
var User = require('../models/user');
var userController = require('../controllers/userController');



exports.createPost = function(id, postMap, res, next) {
	//console.log(req.body);
	var userTemp = {};
        User.findById(id, function(err, user) {
            if (err)
                return res.send(err);

            userTemp = user;
        });

        userController.updateUser(id, userTemp, res, next);

        Post.create(postMap, function(err, newPost) {
        	if(err)
        		res.send(err);

        	console.log('%s create a new post saying %s', userTemp.userName, postMap.text);

        });
}