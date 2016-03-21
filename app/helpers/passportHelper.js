var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , hash = require('./hash')
  , models = require('./models')
  ;

passport.use(new LocalStrategy(function (username, password, done) {
  models.User.filter({username: username}).run().then(function(user) {
    console.log(user)
    if (user.length == 0) { return done(null, false); }
    if (!hash.compareHash(password, user[0].password)) {
       return done(null, false);
    }
    return done(null, user[0]);
  })
}))

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  models.User.get(id).run().then(function(user) {
    cb(null, user);
  })
  .error(function(err) {
    if (err) { return cb(err); }
  });
}); 

module.exports = passport;
