var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
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



app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));






app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
app.use(passport.session());

/*
app.get('/login', function(req, res) {
  res.render('login');
});
*/

var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}


passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username + password);
    User.findOne({
      username: username, 
    }, function(err, user) {
      console.log('entered local strategy');
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
}));


app.post('/login', 
  passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/login'}),
  function(req, res) {
    console.log(req, res);
    return res.send(req.user);
  }
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/*
app.get('/loginSuccess', function(req, res, next) {
  res.redirect('Successfully authenticated');
});
*/









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







var routes = require('./routes')(app);
app.use('/api', api);

/*
app.get('/login', function (req, res, next) {
  res.render('login');
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
    console.error(err);
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
