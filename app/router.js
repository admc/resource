var express = require('express');
var passport = require('passport');
var router = express.Router();
var auth = require('connect-ensure-login').ensureLoggedIn('/user/login');

//controllers
var user = require('./controllers/user');
var home = require('./controllers/home');
var collection = require('./controllers/collection');
var experience = require('./controllers/experience');

//auth behavior
var redirectObj = { 
  successRedirect: '/'
  , failureRedirect: '/user/login'
  , failureFlash: 'Invalid username or password.'
};

//Crazy hacky shit to clear flash messages from login UI
router.get('/*', function(req, res, next) {
  req.session.flash = [];
  next();
});

router.get('/', auth, home.index);
router.get('/user/login', user.login);
router.post('/user/login', passport.authenticate('local', redirectObj), user.loginAuth);
router.get('/user/logout', user.logout);
router.get('/user/register', user.register);
router.post('/user/create', user.create);
router.get('/user/profile', auth, user.profile);
router.get('/user/me', auth, user.me);

router.get('/collection', auth, collection.all);
router.post('/collection/create', auth, collection.create);
router.get('/collection/:id', auth, collection.view);

router.get('/experience', auth, experience.all);
router.post('/experience/create', auth, experience.create);
router.get('/experience/:id', auth, experience.view);

module.exports = router;
