var express = require('express');
var router = express.Router();

var Account = require('../models/account');

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else {
    res.redirect('/')
  }
}

router.use(isLoggedIn)

/* GET users listing. */
router.get('/', function(req, res, next) {
  Account.find(function(err, userdata){
    if(err){
      res.render('error', {
        message: "Failed",
        error: err,
        user: req.user
      });
    } else {
      res.render('users', {
        users: userdata,
        title: "Avaliable users in Database",
        user: req.user
      });
    }
  })
});

module.exports = router;
