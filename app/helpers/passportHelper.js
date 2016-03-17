var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , hash = require('./hash')
  , db = require('./db')
  ;

//console.log(db.table("user").filter({username:"tester1"}).run().then(function(user) {console.log(user)}))
//console.log(db.table("user").get("56832a16-80af-4bad-bc53-34cd920e69c1").run().then(function(user) {console.log(user)}))

passport.use(new LocalStrategy(function (username, password, done) {
  db.table("user").filter({username: username}).run()
    .then(function (users) {
      var user = users[0];
      if (!user) { return done(null, false); }
      if (!hash.compareHash(password, user.password)) {
         return done(null, false);
      }
      return done(null, user);
    })
    .error(function(err) {
      return done(err);
    });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.table("user").get(id).run()
  .then(function (user) {
    cb(null, user);
  })
  .error(function(err) {
    if (err) { return cb(err); }
  });
}); 

module.exports = passport;
