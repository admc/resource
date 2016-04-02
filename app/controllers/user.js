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

  models.User.filter({username: userData.username}).run()
    .then(function(user) {

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

user.view = function(req, res) {
  //will probably want to add a get for the profile infos.
  models.User.get(req.params.id).run().then(function(user) {
    res.json(user);
  })
};

user.me = function(req, res) {
  res.json(req.user);
};

//for the currently logged in user, get their organizations, projects and people
//for the /people/list page
user.list = function(req, res) {
  //does not work
  models.Organizations.get([req.user.organizations[0].id, req.user.organizations[1].id])
    //.getJoin({organizations: true, projects: true, users: true, attributes: true}).run()
    .getJoin({users: true}).run()
    .then(function(organizations) {
      console.log(organizations)
      res.json(user);
    })
};

module.exports = user;
