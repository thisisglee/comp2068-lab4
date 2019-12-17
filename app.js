var express = require('express');
var pug = require('pug');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// bring in our configuration file
var config = require('./config/config');

// include the mongoose package
var mongoose = require('mongoose');
// connect to mongodb
mongoose.connect(config.mongodb);

// session handling library
var session = require('express-session');
// passport for authentication.
var passport = require('passport');
// the type of authentication we want to use
var localStrategy = require('passport-local').Strategy;
// flash helps us send messages between pages
var flash = require('connect-flash');

// our handler for all authentication.
var auth = require('./routes/auth');
var index = require('./routes/index');
var users = require('./routes/users');
var cars = require('./routes/cars');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add flash for express
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// enable session support
app.use(session({
  secret: config.session_secret,
  // refresh the user session every time they visit a page.
  resave: true,
  // only use sessions if a person is logged in.
  saveUninitialized: false
}))

// passport
app.use(passport.initialize());
// helps by setting up the user details for
// authentication into the session
app.use(passport.session());

// link to the model we're going to use
var Account = require('./models/account');
// tell passport which model to use
passport.use(Account.createStrategy());

// these tell passport how/where to get the user information
// from for each page
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// tie our authentication router to /auth in express
app.use('/auth', auth);
app.use('/', index);
app.use('/users', users);
app.use('/cars', cars);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
