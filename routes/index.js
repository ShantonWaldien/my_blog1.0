var express = require('express');
var router = express.Router();

var Pokemon = require('../db.json');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {title: "All Pokemon"});

// });



router.get('/', function (req, res, next) {

    let data = {      
        title: 'Featured Posts',
        pokemon : Pokemon, 
        message: false,
        
        
    }
     // checks if there is a user verification cookie
  if (req.cookies.userId !== undefined){
    // var to find index
    var id;
    var users = Pokemon.users;
    // loop to find index
    for(var i = 0; i < users.length; i++){
      if (users[i].id == req.cookies.userId){
        id = i;
      }
    }

    // sets login variables
    req.app.locals.user = users[id].username;
    req.app.locals.logedIn = true;
  }

  if (req.cookies.cookieWarning !== undefined){
    req.app.locals.cookieWarning = true;
    // for developement
    req.app.locals.cookieWarning = false;
    res.clearCookie('cookieWarning');
  }

    res.render('index', data);

});

// for cookie
router.post('/',function(req,res,next){
    res.cookie('cookieWarning','we gave cookies');
    res.redirect('/');
  })
  

module.exports = router;

////////////////////
