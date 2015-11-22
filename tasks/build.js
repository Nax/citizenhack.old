'use strict'

var gulp    = require('gulp')
var connect = require('gulp-connect')

module.exports = function () {
    gulp.src(['dist/index.html', 'dist/style.css', 'dist/citizenhack.js'])
        .pipe(connect.reload())
}
