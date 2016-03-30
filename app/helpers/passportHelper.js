var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , hash = require('./hash')
  , models = require('./models')
  ;

passport.use(new LocalStrategy(function (username, password, done) {
  models.User.filter({username: username}).run().then(function(users) {
    if (users.length == 0) { return done(null, false); }
    if (!hash.compareHash(password, users[0].password)) {
       return done(null, false);
    }

    models.User.get(users[0].id).getJoin({organizations: true}).run().then(function(user) {
      return done(null, user);
    })
  })
}))

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {

  models.User.get(id).getJoin({organizations: true}).run().then(function(user) {
    cb(null, user);
  })
  .error(function(err) {
    if (err) { return cb(err); }
  });
}); 

module.exports = passport;
