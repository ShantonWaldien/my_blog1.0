var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Pokemon = require('./db.json');

var indexRouter = require('./routes/index');
var createRouter = require('./routes/create');
var viewRouter = require('./routes/view');
var updateRouter = require('./routes/update');
var deleteRouter = require('./routes/delete');
var usersRouter = require('./routes/users');
var archiveRouter = require('./routes/archive');
var registerRouter = require('./routes/register');
var signInRouter = require('./routes/sign_in');
var signOutRouter = require('./routes/sign_out');

// var archiveRouter = require('.routes/archive');

// global variables

// variables for signed in user
  // gets username to display as loged in
  app.locals.user = "";
  // if logedIn is true it allows for editing,deleting and creating
  // it represents a loged in user
app.locals.logedIn = false;
app.locals.regError = "";
app.locals.signError = "";
app.locals.cookieWarning = false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//bodyParser Middleware
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//this is not needed if you have bodyParser
//express middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//register routes after middleware
app.use('/', indexRouter);
app.use('/create', createRouter);
app.use('/view', viewRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/users', usersRouter);
app.use('/archive',archiveRouter);
app.use('/register',registerRouter);
app.use('/sign_in',signInRouter);
app.use('/sign_out',signOutRouter);
// app.use('/archive', archiveRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
  
//app listen on this port
module.exports=app
app.listen(8080);