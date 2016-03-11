var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var Invite = require('../models/invite');
var userController = require('../controllers/userController');
var postController = require('../controllers/postController');
var inviteController = require('../controllers/inviteController');
//var async = require('async');



// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});




// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.send({ message: 'hooray! welcome to our api!' });   
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


//get the users current frontpage
router.get('/users/:_id/frontpage', function(req, res, next) {
	console.log(req.params._id);
	User.findById(req.params._id, function(err, user) {
        if(err) {
            res.send(err);
        }
        else {
        	console.log(user.friends);
        	var allUsers = user.friends;
        	allUsers.push(req.params._id);
        	Post.find({creator: {$in : allUsers}}, function(err, posts) {
        		if(err)
        			res.send(err)
				
				return res.json(posts);
			})
			.populate('creator', 'username');
    	}
    });


});



// update the user with this id (accessed at PUT http://localhost:80/api/users/:_id)
router.put('/users/:id', function(req, res, next) {
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


    	userController.updateUser(req.params._id, userMap, res, next);
    });


///////delete a user
router.delete('/users/:_id', function(req, res, next) {
        userController.removeUser(req, res, next);
    });



/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////////////////////INVITES///////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////



//request friendship
router.post('/users/:originid/invites/:targetid', function(req, res, next) { 
	User.findById(req.params.originid, function(err, user) {
		if(err)
			return res.send(err);
		
		if(user == undefined) {
			return res.json({message: 'origin was not found'});
		}
	
		console.log(user.friends.indexOf(req.params.targetid));

		if(user.friends.indexOf(req.params.targetid) >= 0) {
			return res.json({message : 'already friends'});
		}
		else {
			Invite.findOne({
				origin: req.params.originid,
				target: req.params.targetid
			}, function(err, invite) {
					if(err) {
						return res.send(err);
					}
					else if(invite == undefined) {
						inviteController.requestFriend(req.params.originid, req.params.targetid, res, next);

					}
					else {
						return res.json({message: 'Your request is pending'});
					}
			});
	}});
});




//accept each other to both users friends lists
router.delete('/users/:originid/invites/:targetid', function(req, res, next) { 
	User.findById(req.params.originid, function(err, user) {
		if(user.friends.indexOf(req.params.targetid) >= 0) {
			return res.json({message : 'They are already friends'});
		}
		else {
			inviteController.acceptFriend(req.params.originid, req.params.targetid, res, next);
		}
	});
});





router.get('/users/:id/invites', function(req, res, next) {
	Invite.find({ $or:[ {'origin':req.params.id}, {'target':req.params.id}]}, function(err, invites) {
		if(err)
			return res.send(err);
		return res.json(invites);
	}).populate('origin', 'username')
	.populate('target', 'username');
})








////////////////////////////////////////////////////////
//////////////////POST ROUTES///////////////////////////
////////////////////////////////////////////////////////








router.post('/posts', function(req, res, next) {
	var postMap = {
		text: req.body.text,
		creator: req.body.creator
	}
	postController.createPost(req.body.creator, postMap, res, next);
});



router.get('/posts', function(req, res, next) {
	postController.getAllPosts(res, next);
});

router.get('/posts/:id', function(req, res, next) {
	postController.getPost(req.params.id, res, next);
});

router.put('/posts/:id/upvote/:upvoter', function(req, res, next) {
	postController.upvote(req.params.id, req.params.upvoter, res, next);
})


router.put('/posts/:id', function(req, res, next) {
	var postMap = {};
	if(req.body.text != undefined) {
		postMap.text = req.body.text;
    }
    if(req.body.upVotes != undefined) {
        postMap.upVotes = req.body.upVotes;
    }
    if(req.body.upVoters != undefined) {
        postMap.upVoters = req.body.upVoters;
    }
	Post.findByIdAndUpdate(req.params.id, postMap, {new: true}, function(err, post) {
		if(err)
			return res.send(err);
		var opts = [{ path: 'creator', select: 'username' }];
        Post.populate(post, opts, function (err, user) {
        	if(err)
        		res.send(err);
        	return res.json(post);
        })
})
})



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