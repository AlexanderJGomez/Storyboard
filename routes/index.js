var express = require('express');
var router = express.Router();
var passport = require('passport');
var React = require('react');
var ReactDOM= require('react-dom');
var api = require('./api');






router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});


//////////////////REGISTRATION ROUTES//////////////




router.get('/register', function(req, res) {
    React.render(new HelloWorld(), document.getElementById('test'));

    //res.render('register', { });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});


///////////////////LOGIN/LOGOUT ROUTES//////////




router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//////////////////////HOME ROUTES
router.get('/home', function(req, res) {
    res.render('home', {title : 'Storyboard'});
})


router.use('/api', api);



module.exports = router;
