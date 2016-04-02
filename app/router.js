var express = require('express');
var passport = require('passport');
var router = express.Router();
var auth = require('connect-ensure-login').ensureLoggedIn('/user/login');

//controllers
var user = require('./controllers/user');
var home = require('./controllers/home');
var project = require('./controllers/project');
var update = require('./controllers/update');
var organization = require('./controllers/organization');

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

router.get('/user/me', auth, user.me);
router.get('/user/list', auth, user.list);
router.get('/user/:id', auth, user.view);

router.post('/project/create', project.create);
router.get('/project/list', project.list);
router.get('/project/:id', project.view);

router.post('/update/create', update.create);

//router.post('/organization/create', organization.create);
//router.get('/organization/list', organization.list);
router.get('/organization/:id', organization.view);

module.exports = router;
