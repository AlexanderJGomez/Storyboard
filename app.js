var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var expressSession = require('express-session');
var bcrypt = require('bcryptjs');
var flash    = require('connect-flash');

var app = express();
var server = http.createServer(app);
require('./db');

//app.use(app.router);







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());






/*
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
*/





app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
app.use(passport.session());


app.get('/login', function(req, res) {
  res.render('login');
});


app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
/*
app.get('/loginSuccess', function(req, res, next) {
  res.redirect('Successfully authenticated');
});
*/


var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}

/*
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username ' + username);
          return done(null, false, req.flash('message', 'You are not a user'));                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));
*/





passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    User.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));



passport.serializeUser(function(user, done) {
  if (user)
    done(null, user._id);
});
passport.deserializeUser(function(user_id, done) {
  User.findOne({_id: user_id}, function(err, user) {
    if (err) done(err, null);
    else done(null, user);
  })
});





app.use('/', routes);
app.use('/users', users);
app.use('/api', api);
app.get('/helloworld', function (req, res, next) {
  res.render('helloworld', {title: 'dicks'});
})
/*
app.get('/login', function (req, res, next) {
  res.render('login');
})

app.post('/login', function(req, res, next) {
  console.log(req.body.username, req.body.password);
})
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





server.listen(80);
console.log('server started');
