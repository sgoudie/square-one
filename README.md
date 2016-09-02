# Square One

A lightweight Wordpress boilerplate bringing together _s, Bootstrap, npm and Gulp.

## Get Started

`$ git clone https://github.com/sgoudie/square-one theme-name && rm -rf theme-name/.git`

- Run a find and replace for Square One, square_one, and square-one to match your theme
- `npm install && npm start` in the command line will run npm, and gulp for the first time. It'll fire up a browser-sync window too and watch your changes.
- After that just use `gulp`, or `npm start` each time you start work on your project.
- When you are ready to deploy, run `npm run build` and a neat little zip file of your theme will be created (without all the stuff you don't need like node modules).

### Local Development
We recommend using [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV.git) to setup a Vagrant server for local Wordpress development. Once you have Vagrant and Virtual Box installed, here is the quick command to setup a new project:

`git clone https://github.com/Varying-Vagrant-Vagrants/VVV.git project-name && cd project-name && rm -rf .git`

The just run `vagrant up`, wait a few minutes whilst Vagrant does it's thing, then clone Square One.

## Features

Square One is built on top of _s, but adds a few extras:

#### Bootstrap (SASS) v3
Managed via npm. Override variables in `src/common/_variables.scss`. All the css is minified, prefixed, and source mapped.

#### ES6 & JS Optimisation
Write your scripts inside `assets/js/src` and they'll get babelled, concated, and uglified. In the gulp file you can include links to files in npm modules that you want to grab.

#### FontAwesome, jQuery and FastClick
Fonts included. You're welcome.

#### Gulp SASS and PostCSS
SASS for precompiling, running automatically. PostCSS is used for CssNano and Autoprefixer; saving your fingers from vendor prefix fatigue.

#### BrowserSync
If you're using VVV for you local setup, this will work out of the box on port 9000. If not, make sure that the Gulp file is updated with the address of your development server.

#### Google Fonts
In `functions.php` there is a little snippet for adding Google Fonts. Just uncomment it and add your font family and weights.

```js
function google_fonts() {
  $query_args = array(
    'family' => 'Oswald:700,400|Merriweather:400italic,400,300italic,700'
  );
  wp_register_style( 'google_fonts', add_query_arg( $query_args, "//fonts.googleapis.com/css" ), array(), null );
  wp_enqueue_style( 'google_fonts' );
}
add_action('wp_enqueue_scripts', 'google_fonts');
```
