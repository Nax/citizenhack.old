'use strict';

var gulp    = require('gulp');
var rename  = require('gulp-rename');

module.exports = function () {
    var env = process.env.NODE_ENV || 'development';
    gulp.src('config/' + env + '.js').pipe(rename('config.js')).pipe(gulp.dest('client/'));
}
