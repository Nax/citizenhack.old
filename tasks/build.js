'use strict'

var gulp    = require('gulp')
var connect = require('gulp-connect')

module.exports = function () {
    gulp.src(['dist/client/index.html', 'dist/client/style.css', 'dist/client/citizenhack.js'])
        .pipe(connect.reload())
}
