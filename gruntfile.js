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
                        'src/vendor/createjs/easeljs/utils/Log.js',
                        'src/vendor/createjs/easeljs/utils/UID.js',
                        'src/vendor/createjs/easeljs/events/Event.js',
                        'src/vendor/createjs/easeljs/events/EventDispatcher.js',
                        'src/vendor/createjs/easeljs/utils/Ticker.js',
                        'src/vendor/createjs/easeljs/events/MouseEvent.js',
                        'src/vendor/createjs/easeljs/geom/Matrix2D.js',
                        'src/vendor/createjs/easeljs/geom/Point.js',
                        'src/vendor/createjs/easeljs/geom/Rectangle.js',
                        'src/vendor/createjs/easeljs/ui/ButtonHelper.js',
                        'src/vendor/createjs/easeljs/display/DisplayObject.js',
                        'src/vendor/createjs/easeljs/display/DOMElement.js',
                        'src/vendor/createjs/easeljs/display/Shadow.js',
                        'src/vendor/createjs/easeljs/display/SpriteSheet.js',
                        'src/vendor/createjs/easeljs/display/Graphics.js',
                        'src/vendor/createjs/easeljs/display/Container.js',
                        'src/vendor/createjs/easeljs/display/Stage.js',
                        'src/vendor/createjs/easeljs/display/Bitmap.js',
                        'src/vendor/createjs/easeljs/display/Shape.js',
                        'src/vendor/createjs/easeljs/display/Sprite.js',
                        'src/vendor/createjs/easeljs/display/Text.js',
                        'src/vendor/createjs/easeljs/utils/SpriteSheetUtils.js',
                        'src/vendor/createjs/easeljs/utils/SpriteSheetBuilder.js',
                        'src/vendor/createjs/easeljs/display/DOMElement.js',
                        'src/vendor/createjs/easeljs/filters/Filter.js',
                        'src/vendor/createjs/easeljs/filters/AlphaMapFilter.js',
                        'src/vendor/createjs/easeljs/filters/AlphaMaskFilter.js',
                        'src/vendor/createjs/easeljs/filters/BoxBlurFilter.js',
                        'src/vendor/createjs/easeljs/filters/ColorFilter.js',
                        'src/vendor/createjs/easeljs/filters/ColorMatrix.js',
                        'src/vendor/createjs/easeljs/filters/ColorMatrixFilter.js',
                        'src/vendor/createjs/easeljs/ui/ButtonHelper.js',
                        'src/vendor/createjs/easeljs/ui/Touch.js',
                        'src/vendor/createjs/easeljs/utils/SpriteSheetBuilder.js',
                        'src/vendor/createjs/easeljs/utils/SpriteSheetUtils.js',
                        'src/vendor/createjs/easeljs/version.js',
                        'src/vendor/createjs/easeljs/version_movieclip.js',
                        'src/vendor/createjs/preloadjs/**/*.js',
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