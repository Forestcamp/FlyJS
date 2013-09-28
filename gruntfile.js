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
                        'src/vendor/createjs/events/Event.js',
                        'src/vendor/createjs/events/EventDispatcher.js',
                        'src/vendor/createjs/utils/IndexOf.js',
                        'src/vendor/createjs/utils/Log.js',
                        'src/vendor/createjs/utils/Proxy.js',
                        'src/vendor/easeljs/events/MouseEvent.js',
                        'src/vendor/easeljs/utils/UID.js',
                        'src/vendor/easeljs/utils/Ticker.js',
                        'src/vendor/easeljs/events/MouseEvent.js',
                        'src/vendor/easeljs/geom/Matrix2D.js',
                        'src/vendor/easeljs/geom/Point.js',
                        'src/vendor/easeljs/geom/Rectangle.js',
                        'src/vendor/easeljs/ui/ButtonHelper.js',
                        'src/vendor/easeljs/ui/Touch.js',
                        'src/vendor/easeljs/display/DisplayObject.js',
                        'src/vendor/easeljs/display/DOMElement.js',
                        'src/vendor/easeljs/display/Shadow.js',
                        'src/vendor/easeljs/display/SpriteSheet.js',
                        'src/vendor/easeljs/display/Graphics.js',
                        'src/vendor/easeljs/display/Container.js',
                        'src/vendor/easeljs/display/Stage.js',
                        'src/vendor/easeljs/display/Bitmap.js',
                        'src/vendor/easeljs/display/Shape.js',
                        'src/vendor/easeljs/display/Sprite.js',
                        'src/vendor/easeljs/display/Text.js',
                        'src/vendor/easeljs/utils/SpriteSheetUtils.js',
                        'src/vendor/easeljs/utils/SpriteSheetBuilder.js',
                        'src/vendor/easeljs/filters/Filter.js',
                        'src/vendor/easeljs/filters/AlphaMapFilter.js',
                        'src/vendor/easeljs/filters/AlphaMaskFilter.js',
                        'src/vendor/easeljs/filters/ColorFilter.js',
                        'src/vendor/easeljs/filters/ColorMatrix.js',
                        'src/vendor/easeljs/filters/ColorMatrixFilter.js',
                        'src/vendor/easeljs/version.js',
                        'src/vendor/easeljs/version_movieclip.js',
                        'src/vendor/preloadjs/**/*.js',
                        'src/flyjs/utils/Key.js',
                        'src/flyjs/utils/MathUtil.js',
                        'src/flyjs/utils/VertexLib.js',
                        'src/flyjs/utils/GamePad.js',
                        'src/flyjs/texture/AssetManager.js',
                        'src/flyjs/collection/EntitiesCollection.js',
                        'src/flyjs/core/Entity.js',
                        'src/flyjs/core/command/Command.js',
                        'src/flyjs/core/command/SerialCommand.js',
                        'src/flyjs/core/loader/Loader.js',
                        'src/flyjs/core/loader/ImageLoader.js',
                        'src/flyjs/core/loader/ManifestLoader.js',
                        'src/flyjs/core/loader/SpriteSheetLoader.js',
                        'src/flyjs/core/collision/Node.js',
                        'src/flyjs/core/collision/BoundsNode.js',
                        'src/flyjs/core/collision/QuadTree.js',
                        'src/flyjs/core/ManifestManager.js',
                        'src/flyjs/core/ManifestParser.js',
                        'src/flyjs/render/Render.js',
                        'src/flyjs/render/StageRender.js'
                    ],
                    dest: '<%= meta.deployPath %>flyjs.min.js'
                }],
                options: {
                    report: 'min',
                    beautify: false,
                    mangle: true,
                    toplevel: true
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