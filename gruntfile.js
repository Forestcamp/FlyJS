/*global module:false*/
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            core_banner:
                '// Fly.js \n' +
                '// Distributed under MIT license\n'
        }
    });
};