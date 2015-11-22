'use strict'

var gulp        = require('gulp')
var connect     = require('gulp-connect')

module.exports = function () {
    connect.server({
        root: './dist',
        port: 9000,
        debug: true,
        livereload: true
    })
}
