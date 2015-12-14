'use strict'

var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');

module.exports = function () {
    nodemon({
        script: 'server/server.js',
        ignore: ['*', '!server/*']
    });
}
