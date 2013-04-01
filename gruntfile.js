/*global module:false*/
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            srcPath: 'src/',
            deployPath: 'deploy/',
            banner:
                '// Fly.js \n' +
                '// Distributed under MIT license\n'
        },
        concat: {
            options: {
                stripBanners: true
            },
            dist: {
                src: ['<%= meta.srcPath %>core/*.js', '<%= meta.srcPath %>render/*.js'],
                dest: '<%= meta.deployPath %>cocat.js'
            }
        },
        uglify: {
            options: {

            },
            dist: {
                src: '<%= meta.deployPath %>cocat.js',
                dest: '<%= meta.deployPath %>cocat.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                indent: 2,
                trailing: true,
                globals: {
                    exports: true,
                    module: false
                }
            },
            files: ['gruntfile.js', 'src/core/*.js', 'src/render/*.js', 'src/utils/*.js']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task
    grunt.registerTask('default', ['concat', 'uglify']);
};