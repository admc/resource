var db = require('../helpers/db');
var hash = require('../helpers/hash');
var schema = require('../helpers/schema');
var table = "user";
var user = {};

var defaultCollection = {
  username: null
  , name: "Default"
  , description: "A home for wayward experiences"
  , created: Date.now()
};

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
  var errors = schema.user.validate(userData);
  if (errors.length != 0) {
    req.flash('error', errors.toString());
    res.redirect('/user/register');
  }
  else {
    var user = {
      username: userData.username
      , email: userData.email
      , firstname: userData.firstname
      , lastname: userData.lastname
      , created: Date.now()
      , password: hash.generateHash(userData.password)
    };

    db.table(table).filter({username: userData.username}).run()
      .then(function(userSearch) {
        if (userSearch.length != 0) {
          req.flash('error', 'Username is taken');
          res.redirect('/user/register');
        }
        else {
          //create them a default collection
          db.table(table).insert(user).run()
            .then(function(result) {
              defaultCollection.username = user.username;
              db.table("collection").insert(defaultCollection).run()
                .then(function(result) {
                  //put the default collection ID in the user OBJ
                  db.table(table)
                    .filter({username: user.username})
                    .update({"defaultCollectionId": result.generated_keys[0]}).run()
                    .then(function(result) {
                      res.redirect('/user/login');
                    })
                })
            })
        }
      })
  }
};

user.me = function(req, res) {
  var userObj = {
    username: req.user.username
    , email: req.user.email
    , firstname: req.user.firstname
    , lastname: req.user.lastname
    , defaultCollectionId: req.user.defaultCollectionId
  };
  res.json(userObj);
};

module.exports = user;
