var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var Invite = require('../models/invite');
var userController = require('../controllers/userController');
var postController = require('../controllers/postController');
var inviteController = require('../controllers/inviteController');



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


//add each other to both users friends lists
router.put('/users/request/:_id1/:_id2', function(req, res, next) { 
	//console.log('adding friends  %s  and  %s', req.params._id1, req.params._id2);
	inviteController.requestFriend(req.params._id1, req.params._id2, res, next);
});




//add each other to both users friends lists
router.put('/users/accept/:originid/:targetid', function(req, res, next) { 
	//console.log('adding friends  %s  and  %s', req.params.originid, req.params.targetid);
	inviteController.acceptFriend(req.params.originid, req.params.targetid, res, next);
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