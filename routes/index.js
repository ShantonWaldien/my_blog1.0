var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/create', function(req, res, next) {
  res.render('create', {page:'create', menuId:'create'});
});

router.get('/archive', function(req, res, next) {
  res.render('archive', {page:'archive', menuId:'archive'});
});

router.get('/view', function(req, res, next) {
  res.render('view', {page:'archive', menuId:'view'});
});


router.get('/', function (req, res, next) {

  let data = {
      title: 'All Posts',
      posts: Posts, 
      message: false,
  }

  res.render('index', data);

});
module.exports = router;

