var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var Invite = require('../models/invite');
var userController = require('../controllers/userController');
var postController = require('../controllers/postController');
var inviteController = require('../controllers/inviteController');
var //async = require('async');



// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});




// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


////////////////////////////////////////////////////////
//////////////////USER ROUTES///////////////////////////
////////////////////////////////////////////////////////



// on routes that end in /users
router.post('/users',  function(req, res, next) {
        userController.create(req, res, next);
    });


//get all the users
router.get('/users', function(req, res, next) {
	userController.getAllUsers(res, next);
});


// get the user with that id (accessed at GET http://storyboard.dev/api/users/:_id)
router.get('/users/:_id', function(req, res, next) {
        userController.findUser(req.params._id, res, next);
    });



// update the user with this id (accessed at PUT http://localhost:80/api/users/:_id)
router.put('/users', function(req, res, next) {
    	var userMap = {};
        if(req.body.userName != undefined) {
            userMap.userName = req.body.userName;
        }
        if(req.body.posts != undefined) {
            userMap.posts = req.body.posts;
        }
        if(req.body.friends != undefined) {
            userMap.friends = req.body.friends;
        }


    	userController.updateUser(req.body._id, userMap, res, next);
    });


///////delete a user
router.delete('/users/:_id', function(req, res, next) {
        userController.removeUser(req, res, next);

    });


//request friendship
router.put('/users/request/:_originid/:_targetid', function(req, res, next) { 
	
		User.findById(req.params._originid, function(err, user) {
			if(user == undefined) {
				return res.json({message: 'origin was not found'});
			}
		

			console.log(user.friends.indexOf(req.params._targetid));

			if(user.friends.indexOf(req.params._targetid) >= 0) {
				return res.json({message : 'already friends'});
			}
			else {
				Invite.findOne({
					origin: req.params._originid,
					target: req.params._targetid}, new function(err, invite) {
						if(err) {
							return res.send(err);
						}
						else if(invite == undefined) {
							inviteController.requestFriend(req.params._originid, req.params._targetid, res, next);

						}
						else {
							return res.json({message: 'Your request is pending'});
				//next();
						}
				});
	//console.log('adding friends  %s  and  %s', req.params._id1, req.params._id		}
		}});

		
});




//accept each other to both users friends lists
router.put('/users/accept/:_originid/:_targetid', function(req, res, next) { 
	//console.log('adding friends  %s  and  %s', req.params.originid, req.params.targetid);
	User.findById(req.params._originid, function(err, user) {
		if(user.friends.indexOf(req.params._targetid) >= 0) {
			return res.json({message : 'They are already friends'});
			//next();
		}
		else {
			inviteController.acceptFriend(req.params._originid, req.params._targetid, res, next);
		}
	});
});




////////////////////////////////////////////////////////
//////////////////POST ROUTES///////////////////////////
////////////////////////////////////////////////////////





router.post('/posts', function(req, res, next) {
	var postMap = {
		text: req.body.text,
		creator: req.body._id
	}
	postController.createPost(req.body._id, postMap, res, next);
});



router.get('/posts', function(req, res, next) {
	postController.getAllPosts(res, next);
});




router.delete('/posts/:_id', function(req, res, next) {
	Post.remove({
            _id: req.params._id
        }, function(err, post) {
            if (err)
                return res.send(err);

            return res.json({ message: 'Successfully deleted post' });
        });
});


//router.post('/post/')





module.exports = router;