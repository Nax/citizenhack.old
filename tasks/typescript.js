'use strict'

var gulp        = require('gulp')
var concat      = require('gulp-concat')
var typescript  = require('gulp-typescript')

module.exports = function () {
    gulp.src(['src/ts/**/*.ts'])
        .pipe(typescript()).js
        .pipe(concat('citizenhack.js'))
        .pipe(gulp.dest('dist/'))
}
