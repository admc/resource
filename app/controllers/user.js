var models = require('../helpers/models');
var hash = require('../helpers/hash');
var user = {};

user.login = function(req, res) {
  res.render('login');
};

user.logout =  function(req, res) {
  req.logout();
  res.redirect('/');
};

user.profile = function(req, res) {
  res.render('profile', { user: req.user });
};

user.loginAuth = function(req, res) {
  res.redirect('/');
};

user.register = function(req, res) {
  res.render('register');
};

user.create =  function(req, res) {
  var userData = req.body;

  var newUser = new models.User({
    username: userData.username
    , email: userData.email
    , firstname: userData.firstname
    , lastname: userData.lastname
    , created: Date.now()
    , password: hash.generateHash(userData.password)
  });

  console.log("HERE")

  models.User.filter({username: userData.username}).run().then(function(user) {
    if (user.length != 0) {
      req.flash('error', 'Username is taken');
      res.redirect('/user/register');
    } else {
      newUser.save().then(function(result) {
        res.redirect('/user/login');
      }).error(function(error) {
        req.flash('error', error.toString());
        res.redirect('/user/register');
      });
    }
  })
};

user.me = function(req, res) {
  var userObj = {
    username: req.user.username
    , email: req.user.email
    , firstname: req.user.firstname
    , lastname: req.user.lastname
  };
  res.json(userObj);
};

module.exports = user;
