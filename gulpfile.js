// Call less and compress module (and any others defined)
// and then watch for changes

var gulp = require('gulp')
  , webpack = require('webpack-stream')
  , plugins = require('gulp-load-plugins')()
  //, app = require('./app')
  , debug = require('debug')('app:server')
  , http = require('http')
  , plumber = require('gulp-plumber')
  , notify = require('gulp-notify')
  , imagemin = require('gulp-imagemin')
  , changed = require('gulp-changed')
  , del = require('del')
  ;

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins);
};

gulp.task('less', getTask('less'));
gulp.task('compress', getTask('compress'));
gulp.task('clean', function() {
  return del(['public/css', 'public/js', 'public/images', 'public/font']);
});

gulp.task('libraries', function() {
  var libSrc = './src/client/lib/**/*',
    libDst = './public/js/lib';

  return gulp.src(libSrc)
    .pipe(gulp.dest(libDst))
});

gulp.task('images', function() {
  var imgSrc = './src/images/**/*',
    imgDst = './public/images';

  return gulp.src(imgSrc)
    .pipe(plumber({
      errorHandler: function() {
        console.log('Image copy fail') 
      }
    }))
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst))
});

gulp.task('font', function() {
  return gulp.src(['./src/client/font/**/*'])
    .pipe(gulp.dest('./public/font'));
});

/*gulp.task('server', function() {
  var port = process.env.PORT || '3000';
  app.set('port', port);
  var server = http.createServer(app);

  server.listen(port, function() {
    debug('Express server listening on port ' + server.address().port);
  });

  //server.on('error', onError);
  server.on('listening', function() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  });
});*/

gulp.task('webpack', function() {
  return gulp.src('./src/js/app/AppRoot.jsx')
    .pipe(webpack( require('./config/webpack.config.js') ))
    .pipe(gulp.dest('./public/js'));
});

var things = ['libraries', 'less','compress','images', 'font', 'webpack'];
gulp.task('build', things , function () {
  process.exit(0);
})

gulp.task('dev', things, function () {
  gulp.watch('./src/client/less/**/*.less', ['less']); 
  gulp.watch('./src/client/js/**/*.js', ['compress']); 
  gulp.watch('./src/client/lib/**/*.js', ['libraries']); 
  gulp.watch('./src/app/**/*.js', ['webpack']); 
  gulp.watch('./src/app/**/*.jsx', ['webpack']); 
  gulp.watch('./src/images/**/*', ['images']); 
})
