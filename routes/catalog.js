var post_Controller=require('../controllers/postController')
var user_controller=require('../controllers/userController')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
  module.exports = router;
router.get('/signup',user_controller.sign_up_get)