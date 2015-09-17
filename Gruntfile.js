module.exports = function (grunt) {

    //Sets up config for Grunt Tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        //Adds less files
        less: {
            //Development target (Could create production)
            dist: {
                options: {
                    paths: ["assets/css"],
                    yuicompress: true
                },
                files: {
                    'assets/css/app.css': 'assets/less/app.less'
                }
            }
        },
        //Adds browser prefixes
        autoprefixer: {
            dist: {
                files: {
                    'assets/css/app.css': 'assets/css/app.css'
                }
            }
        },

        watch: {
            less: {
                files: '**/**/*.less',
                tasks: ['less', 'autoprefixer'],
                options: {
                    livereload: 35729
                }
            },
            php: {
                files: ['**/*.php'],
                options: {
                  livereload: 35729
                }
            },
            js: {
                files: ['**/*.js'],
                options: {
                  livereload: 35729
                }
            }
        }
    });

    //Loads tasks for Grunt
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
}
