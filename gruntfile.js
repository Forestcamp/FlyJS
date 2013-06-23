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
            'src/flyjs/core/collision/*.js',
            'src/flyjs/core/command/*.js',
            'src/flyjs/core/loader/*.js',
            'src/flyjs/core/*.js',
            'src/flyjs/render/*.js',
            'src/flyjs/utils/*.js',
            'src/flyjs/collection/*.js',
            'src/flyjs/texture/*.js'
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
                        'src/vendor/stats.min.js',
                        'src/vendor/domReady.js',
                        'src/vendor/jshashtable-2.1.js',
                        'src/vendor/createjs/easeljs/utils/UID.js',
                        'src/vendor/createjs/easeljs/events/EventDispatcher.js',
                        'src/vendor/createjs/easeljs/utils/Ticker.js',
                        'src/vendor/createjs/easeljs/events/MouseEvent.js',
                        'src/vendor/createjs/easeljs/geom/Matrix2D.js',
                        'src/vendor/createjs/easeljs/geom/Point.js',
                        'src/vendor/createjs/easeljs/geom/Rectangle.js',
                        'src/vendor/createjs/easeljs/ui/ButtonHelper.js',
                        'src/vendor/createjs/easeljs/display/Shadow.js',
                        'src/vendor/createjs/easeljs/display/SpriteSheet.js',
                        'src/vendor/createjs/easeljs/display/Graphics.js',
                        'src/vendor/createjs/easeljs/display/DisplayObject.js',
                        'src/vendor/createjs/easeljs/display/Container.js',
                        'src/vendor/createjs/easeljs/display/Stage.js',
                        'src/vendor/createjs/easeljs/display/Bitmap.js',
                        'src/vendor/createjs/easeljs/display/BitmapAnimation.js',
                        'src/vendor/createjs/easeljs/display/Shape.js',
                        'src/vendor/createjs/easeljs/display/Text.js',
                        'src/vendor/createjs/easeljs/utils/SpriteSheetUtils.js',
                        'src/vendor/createjs/easeljs/utils/SpriteSheetBuilder.js',
                        'src/vendor/createjs/easeljs/display/DOMElement.js',
                        'src/vendor/createjs/easeljs/filters/Filter.js',
                        'src/vendor/createjs/easeljs/ui/Touch.js',
                        'src/vendor/createjs/easeljs/version.js',
                        'src/vendor/createjs/preloadjs/version.js',
                        'src/vendor/createjs/easeljs/events/EventDispatcher.js',
                        'src/vendor/createjs/preloadjs/AbstractLoader.js',
                        'src/vendor/createjs/preloadjs/LoadQueue.js',
                        'src/vendor/createjs/preloadjs/TagLoader.js',
                        'src/vendor/createjs/preloadjs/XHRLoader.js',
                        'src/flyjs/utils/*.js',
                        'src/flyjs/texture/*.js',
                        'src/flyjs/collection/*.js',
                        'src/flyjs/core/command/*.js',
                        'src/flyjs/core/loader/*.js',
                        'src/flyjs/core/*.js',
                        'src/flyjs/core/collision/Node.js',
                        'src/flyjs/core/collision/BoundsNode.js',
                        'src/flyjs/core/collision/QuadTree.js',
                        'src/flyjs/render/*.js'
                    ],
                    dest: '<%= meta.deployPath %>flyjs.min.js'
                }],
                options: {
                    report: 'min',
                    beautify: false
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

    grunt.registerTask('docs', ['yuidoc']);
    grunt.registerTask('ugli', ['jshint', 'uglify']);
    grunt.registerTask('release', ['jshint']);
};