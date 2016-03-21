var express = require('express')
  , path = require('path')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , passport = require('./app/helpers/passportHelper')
  , session = require('express-session')
  , config = require('./config/database')
  , RDBStore = require('express-session-rethinkdb')(session)
  ;

var rDBStore = new RDBStore({
  connectOptions: config
  , table: 'Session'
});

//Routes
var routes = require('./app/router');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public/images/mobile', 'favicon.ico')));
app.use(logger('dev'));
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  store: rDBStore
  , secret: 'freiheit'
  , key: "sid"
  , resave: false
  , saveUninitialized: false 
}));
app.use(require('flash')());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//activate routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
