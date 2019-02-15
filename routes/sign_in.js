// the required variables
var express = require('express');
var router = express.Router();
var users = require('../db.json').users;
var request = require('request');


/* GET sign in page */
router.get('/',function(req,res,next){

  res.render('sign_in',{
    title : "Sign In",
    signError : req.app.locals.signError,
  });

});

// to sign in
router.post('/', function(req, res,next){

  // get stuff from the body
  var logUser = req.body.username;
  var logPassword = req.body.password;

  // checks through the users in the database
  for(var i = 0;i < users.length;i++){

    // if username and password are correct
    if((users[i].username == logUser || users[i].email == logUser)
      && users[i].password == logPassword){

      // creates a cookie
      res.cookie('userId',users[i].id);

      // sets logUser to the correct username
      logUser = users[i].username;
      console.log(req.cookies);
      // sets the correct sign in variables
      req.app.locals.user = logUser ;
      req.app.locals.userIndex = i;
      req.app.locals.signError = "Log In Successful";

      // goes to home page after successful sign in
      res.redirect('/');
    }
  };

  // checks if the user signed in correctly
  if (req.app.locals.user != logUser) {
    // if not
    // say the password and username are incorrect
    req.app.locals.signError = "Username or Password Incorrect!";
  };
    res.redirect('/sign_in');
});

// to give what this page allows other pages to use
module.exports = router
