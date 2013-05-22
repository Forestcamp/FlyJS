/*global module:false*/
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            srcPath: 'src/',
            deployPath: './',
            banner:
                ' Fly.js \n' +
                '(c) 2013 Oleg Pimenov, \n' +
                'Distributed under MIT license\n' +
                'http://github.com/Forestcamp/Fly.js \n'
        },
        lint_files: [
            'Gruntfile.js',
            'example/collide/entities/*.js',
            'example/collide/*.js',
            'example/invaders/*.js',
            'example/hero/*.js',
            'src/core/collision/*.js',
            'src/core/*.js',
            'src/render/*.js',
            'src/utils/*.js',
            'src/collection/*.js',
            'src/texture/*.js'
        ],
        lint_globals: {
            flyjs: true,
            window: true,
            createjs: true
        },

        /*** Tasks ***/
        uglify: {
            options: {
                banner: '/* <%= meta.banner %> */'
            },
            compress_flyjs: {
                files: [{
                    src: [
                        'src/core/**/*.js',
                        'src/render/*.js',
                        'src/utils/*.js',
                        'src/collection/*.js',
                        'src/texture/*.js',
                        'src/vendor/stats.min.js',
                        'src/vendor/createjs/**/*.js'
                    ],
                    dest: '<%= meta.deployPath %>flyjs.min.js'
                }],
                options: {
                    report: 'min'
                }
            }
        },
        yuidoc: {
            name: '<%= pkg.name %>',
            description: '<%= pkg.description %>',
            version: '<%= pkg.version %>',
            url: '<%= pkg.homepage %>',
            options: {
                paths: '<%= meta.srcPath %>core',
                outdir: 'docs/'
            }
        },
        jslint: {
            directives: {
                nomen: true,
                vars: true,
                eqeq: true,
                plusplus: true,
                bitwise: true,
                globals: '<%= lint_globals %>'
            },
            files: '<%= lint_files %>'
        },
        jshint: {
            options: {
                eqeqeq: true,
                eqnull: true,
                globals: '<%= lint_globals %>'
            },
            uses_defaults: '<%= lint_files %>'
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('docs', ['yuidoc']);
    grunt.registerTask('ugli', ['uglify']);
    grunt.registerTask('release', ['jslint', 'jshint']);
};