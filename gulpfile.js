var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var combine = require('stream-combiner2');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
// Processors
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

// STYLES
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

// SCRIPTS
gulp.task('scripts', function() {

	var jsFiles = ['./assets/scripts/*'];
  // Combined streams for error handling
  // No need for pipe.
  var combined = combine.obj([
		filter(['**/*.js']),
		concat('main.js'),
		uglify(),
    rename('main.min.js'),
		gulp.dest('./dist/scripts'),
    browserSync.stream()
  ]);
  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));
  return combined;
});

// WATCH
// Rerun the task when a file changes
gulp.task('watch', function() {
  browserSync.init({
    // Adds php files to the watch
    files: ['./**/*.php', './*.php'],
    // Change this to your dev site address (default configured for VVV)
    proxy: "http://local.wordpress.dev/",
    port: 9000
  });
  gulp.watch('./assets/styles/**/*.scss', ['styles']);
  gulp.watch('./assets/scripts/**/*.js', ['scripts']);
  browserSync.reload();
});

// CLEAN
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], { read: false });
});

// BUILD
gulp.task('build', ['styles', 'scripts']);

// DEFAULT
gulp.task('default', ['clean'], function () {
    gulp.start(['watch', 'build']);
});
