/* PROJECT CONFIG */
const project = 'square-one'; // Name

const buildIgnoreFiles = ['**/.sass-cache','**/.DS_Store'];

const styleSRC = './assets/css/src/main.scss'; // Path to main .scss file
const styleDestination = './assets/css'; // Path to place the compiled CSS file

const jsVendorsDestination = './assets/js/'; // Path to place the compiled JS custom scripts file
const jsVendorsFile = 'vendors'; // Compiled JS custom file name
// List of JS files to copy to vendor
const vendorsJsFiles = [
	"./node_modules/jquery/dist/jquery.min.js",
	"./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js",
	"./node_modules/fastclick/lib/fastclick.js",
];

const jsCustomSRC = './assets/js/custom/*.js'; // Path to JS custom scripts folder
const jsCustomDestination = './assets/js/'; // Path to place the compiled JS custom scripts file
const jsCustomFile = 'custom'; // Compiled JS custom file name

const styleWatchFiles = './assets/css/src/**/*.scss'; // Path to all *.scss files inside css folder and inside them
const customJSWatchFiles = './assets/js/custom/*.js'; // Path to all custom JS files

const buildInclude 	= [
	// include common file types
	'**/*.php',
	'**/*.html',
	'**/*.css',
	'**/*.js',
	'**/*.svg',
	'**/*.ttf',
	'**/*.otf',
	'**/*.eot',
	'**/*.woff',
	'**/*.woff2',
	// include specific files and folders
	'screenshot.png',
	// exclude files and folders
	'!node_modules/**/*',
	'!style.css.map',
	'!assets/js/custom/*',
	'!assets/js/vendor/*',
	'!assets/css/src/*'
];

// ---------------------------//


const gulp = require('gulp');
// CSS
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
//JS
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// Images
const imagemin = require('gulp-imagemin');
// Utility
const browserSync = require('browser-sync').create();
const cache = require('gulp-cache');
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
    port: 9000,
		injectChanges: true
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
gulp.task('vendorsJs', () => {
  // Combined streams for error handling
  // No need for pipe.
  const combined = combine.obj([
		gulp.src(vendorsJsFiles),
		print(),
		babel({ presets: ['es2015'] }),
		concat(`${jsVendorsFile}.js`),
		gulp.dest(jsVendorsDestination),
		rename({
			basename: jsVendorsFile,
			suffix: '.min'
		}),
		uglify(),
		gulp.dest(jsVendorsDestination),
		notify({ message: 'TASK: "vendorsJs" ran', onLast: true }),
  ]);
  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));
  return combined;
});

gulp.task('customJs', () => {
  // Combined streams for error handling
  // No need for pipe.
  const combined = combine.obj([
		gulp.src(jsCustomSRC),
		print(),
		babel({ presets: ['es2015'] }),
		concat(`${jsCustomFile}.js`),
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

// Clean Up
gulp.task('clear', () => {
	cache.clearAll();
});
gulp.task('cleanup', () => {
 return gulp.src(buildIgnoreFiles, { read: false })
	 .pipe(ignore('node_modules/**')) //Example of a directory to ignore
	 .pipe(rimraf({ force: true }))
});
gulp.task('cleanupFinal', function() {
 return gulp.src(buildIgnoreFiles, { read: false })
	 .pipe(ignore('node_modules/**')) //Example of a directory to ignore
	 .pipe(rimraf({ force: true }))
});



// Moves files ready for build
gulp.task('buildFiles', () => {
	return gulp.src(buildInclude)
		.pipe(gulp.dest(build))
		.pipe(notify({ message: 'Copy from buildFiles complete', onLast: true }));
});

// Creating the ZIP
 gulp.task('buildZip', () => {
 	return gulp.src(`${build}/**/`)
 		.pipe(zip(`${project}.zip`))
 		.pipe(gulp.dest('./'))
 		.pipe(notify({ message: 'Zip task complete', onLast: true }));
 });

 // Package Distributable Theme
 gulp.task('build', (cb) => {
 	runSequence('styles', 'cleanup', 'vendorsJs', 'customJs', 'buildFiles', 'buildZip','cleanupFinal', cb);
 });

// DEFAULT
gulp.task('default', ['fonts', 'styles', 'vendorsJs', 'customJs', 'browser-sync'], () => {
	gulp.watch(styleWatchFiles, ['styles']);
 	gulp.watch(customJSWatchFiles, ['customJs']);
});
