var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');



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

// on routes that end in /bears
// ----------------------------------------------------
router.post('/users', function(req, res, next) {
        
        

        var user = {
        	firstName: req.body.firstName,
        	lastName: req.body.lastName
        };

        // save the bear and check for errors
        User.create(user, function(err, newUser) {
            if (err)
                return res.send(err);

            return res.json(newUser);
        });
        
    });

router.get('/users', function(req, res, next) {
	User.find(function(err, users) {
            if (err)
                return res.send(err);

            return res.json(users);
        });
});

router.route('/users/:_id')

    // get the user with that id (accessed at GET http://localhost:80/api/users/:_id)
    .get(function(req, res, next) {
        User.findById(req.params._id, function(err, user) {
            if (err)
                return res.send(err);

            return res.json(user);
        });
    });
// update the user with this id (accessed at PUT http://localhost:80/api/users/:_id)
router.route('/users/:_id').put(function(req, res, next) {
    	var userMap = {};
    	if(req.body.firstName != undefined) {
    		userMap.firstName = req.body.firstName;
    	}
    	if(req.body.lastName != undefined) {
    		userMap.lastName = req.body.lastName;
    	}
    	if(req.body.posts != undefined) {
    		userMap.posts = req.body.posts;
    	}
    	if(req.body.friends != undefined) {
    		userMap.friends = req.body.friends;
    	}

        // use our user model to find the bear we want
        User.findByIdAndUpdate(req.params._id, userMap, {new: true}, function(err, user) {
        	if(err) 
    		return res.send(err);

    	return res.json(user);
        });

    });
///////
router.route('/users/:_id').delete(function(req, res, next) {
        User.remove({
            _id: req.params._id
        }, function(err, user) {
            if (err)
                return res.send(err);

            return res.json({ message: 'Successfully deleted' });
        });
    });




module.exports = router;