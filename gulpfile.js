/* PROJECT CONFIG */
var project = 'square-one'; // Name

var styleSRC = './assets/css/src/main.scss'; // Path to main .scss file
var styleDestination = './assets/css'; // Path to place the compiled CSS file

var jsCustomSRC = './assets/js/custom/*.js'; // Path to JS custom scripts folder
var jsCustomDestination = './assets/js/'; // Path to place the compiled JS custom scripts file
var jsCustomFile = 'custom'; // Compiled JS custom file name

var styleWatchFiles = './assets/css/src/**/*.scss'; // Path to all *.scss files inside css folder and inside them
var customJSWatchFiles = './assets/js/custom/*.js'; // Path to all custom JS files

// ---------------------------//


var gulp = require('gulp');
// CSS
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
//JS
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// Utility
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var combine = require('stream-combiner2');
var filter = require('gulp-filter');
var notify = require('gulp-notify');
var print = require('gulp-print');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
// Processors
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

// Browser-Sync
gulp.task('browser-sync', function() {
	var files = [
		'**/*.php',
		'**/*.{png,jpg,gif}'
	];
	browserSync.init({
    // Adds php files to the watch
    files: ['./**/*.php', './*.php'],
    // Change this to your dev site address (default configured for VVV)
    proxy: "http://local.wordpress.dev/",
    port: 9000
  });
});

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
    gulp.src(styleSRC),
    sourcemaps.init(),
    sass().on('error', sass.logError),
    sourcemaps.write( { includeContent: false } ),
    sourcemaps.init( { loadMaps: true } ),
    postcss(processors),
		rename('main.min.css'),
		sourcemaps.write('./'),
    gulp.dest(styleDestination),
    notify({ message: 'TASK: "styles" ran', onLast: true }),
    browserSync.stream()
  ]);
  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));
  return combined;
});

// SCRIPTS
gulp.task('customJs', function() {
  // Combined streams for error handling
  // No need for pipe.
  var combined = combine.obj([
		gulp.src(jsCustomSRC),
		print(),
		babel({ presets: ['es2015'] }),
		concat(jsCustomFile + '.js'),
		gulp.dest(jsCustomDestination),
		rename({
			basename: jsCustomFile,
			suffix: '.min'
		}),
		uglify(),
		gulp.dest(jsCustomDestination),
		notify({ message: 'TASK: "customJs" ran', onLast: true }),
    browserSync.stream()
  ]);
  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));
  return combined;
});

// BUILD
gulp.task('build', ['styles', 'scripts' ]);

// DEFAULT
gulp.task('default', ['styles', 'customJs', 'browser-sync'], function () {
	gulp.watch(styleWatchFiles, ['styles']);
 	gulp.watch(customJSWatchFiles, ['customJs']);
});
