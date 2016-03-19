var gulp = require('gulp');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var combine = require('stream-combiner2');
var browserSync = require('browser-sync').create();
var wiredep = require('wiredep').stream;

// Processors
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

//STYLES
gulp.task('styles', function() {
  // Processors for PostCSS
  var processors = [
    autoprefixer({browsers: 'last 2 versions'}),
    cssnano({autoprefixer: false})
  ];
  // Combined streams for error handling
  // No need for pipe.
  var combined = combine.obj([
    gulp.src('./assets/styles/main.scss'),
    sass().on('error', sass.logError),
    postcss(processors),
    rename('main.min.css'),
    gulp.dest('./dist/styles'),
    browserSync.stream()
  ]);
  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));
  return combined;
});

// FONTS
gulp.task('fonts', function() {
  return gulp.src(['./bower_components/font-awesome/fonts/*'])
    .pipe(gulp.dest('./dist/fonts/'));
});

// Inject Bower components
gulp.task('wiredep', function () {
  gulp.src('./assets/styles/*.scss')
    .pipe(wiredep({
      // directory: './bower_components',
      // ignorePath: './bower_components/'
    }))
    .pipe(gulp.dest('./assets/styles'));
});

// WATCH
// Rerun the task when a file changes
gulp.task('watch', function() {
  browserSync.init({
    // Adds php files to the watch
    files: ['./**/*.php', './*.php'],
    // Change this to your dev site address
    proxy: "http://sgoudie.dev"
  });
  gulp.watch('./assets/styles/**/*.scss', ['styles']);
  browserSync.reload();
  // Watch bower files
  gulp.watch('bower.json', ['wiredep']);
});

// CLEAN
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], { read: false });
});

// BUILD
gulp.task('build', ['styles', 'fonts']);

// DEFAULT
gulp.task('default', ['clean'], function () {
    gulp.start(['watch', 'build']);
});
