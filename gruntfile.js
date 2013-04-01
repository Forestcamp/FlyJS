/*global module:false*/
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            banner:
                '// Fly.js \n' +
                '// Distributed under MIT license\n'
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
};