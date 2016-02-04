var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var userController = require('../controllers/userController');
var postController = require('../controllers/postController');



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
	userController.getUsers(req, res, next);
});


// get the user with that id (accessed at GET http://storyboard.dev/api/users/:_id)
router.get('/users/:_id', function(req, res, next) {
        userController.findUser(req, res, next);
    });



// update the user with this id (accessed at PUT http://localhost:80/api/users/:_id)
router.put('/users/:_id', function(req, res, next) {
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


///////
router.delete('/users/:_id', function(req, res, next) {
        userController.removeUser(req, res, next);
    });




////////////////////////////////////////////////////////
//////////////////POST ROUTES///////////////////////////
////////////////////////////////////////////////////////


router.post('/posts/newpost/:_id', function(req, res, next) {
	var postMap = {
		text: req.body.text,
		creator: req.params._id
	}
	postController.createPost(req.params._id, postMap, res, next);
});







module.exports = router;