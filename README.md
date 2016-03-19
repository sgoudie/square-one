# Square One

A lightweight Wordpress boilerplate bringing together _s, Bootstrap, Bower, and Gulp.

## Get Started

`$ git clone https://github.com/smalljoys/square-one theme-name && rm -rf theme-name/.git`

- Run a find and replace for Square One, square_one, and square-one to match your theme
- `npm install && npm run build` in the command line will run npm, bower, and gulp build for the first time
- After that just use `npm run build`

## Features

Square One is built on top of _s, but adds a few extras:

#### Bootstrap (SASS) v3
Managed via Bower, and automatically inserted with Wiredep. Override variables in _variables.scss

#### Gulp SASS and PostCSS
SASS for precompiling, running automatically. PostCSS is used for CssNano and Autoprefixer; saving your fingers from vendor prefix fatigue.

#### BrowserSync
Make sure that the Gulp file is updated with the address of your development server. (We recommend using Trellis & Bedrock).

## To Do:
- ES6 support
- Add js gulp tasks
- Add image gulp tasks
- Add config file for Gulp
