/* PROJECT CONFIG */
const project = 'square-one'; // Name

const styleSRC = './assets/css/src/main.scss'; // Path to main .scss file
const styleDestination = './assets/css'; // Path to place the compiled CSS file

const jsCustomSRC = './assets/js/custom/*.js'; // Path to JS custom scripts folder
const jsCustomDestination = './assets/js/'; // Path to place the compiled JS custom scripts file
const jsCustomFile = 'custom'; // Compiled JS custom file name

const styleWatchFiles = './assets/css/src/**/*.scss'; // Path to all *.scss files inside css folder and inside them
const customJSWatchFiles = './assets/js/custom/*.js'; // Path to all custom JS files

// ---------------------------//


const gulp = require('gulp');
// CSS
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
//JS
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// Utility
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const combine = require('stream-combiner2');
const filter = require('gulp-filter');
const notify = require('gulp-notify');
const print = require('gulp-print');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
// Processors
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Browser-Sync
gulp.task('browser-sync', () => {
	const files = [
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
gulp.task('styles', () => {
  // Processors for PostCSS
  const processors = [
    autoprefixer({browsers: 'last 2 versions'}),
    cssnano({autoprefixer: false})
  ];
  // Combined streams for error handling
  // No need for pipe.
  const combined = combine.obj([
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
gulp.task('customJs', () => {
  // Combined streams for error handling
  // No need for pipe.
  const combined = combine.obj([
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

// FONTS
gulp.task('fonts', () => {
  return gulp.src(['./node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest('./assets/fonts/'));
});

// BUILD
gulp.task('build', ['styles', 'scripts' ]);

// DEFAULT
gulp.task('default', ['fonts', 'styles', 'customJs', 'browser-sync'], () => {
	gulp.watch(styleWatchFiles, ['styles']);
 	gulp.watch(customJSWatchFiles, ['customJs']);
});
