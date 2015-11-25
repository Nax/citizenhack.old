'use strict';

var gulp    = require('gulp');
var rename  = require('gulp-rename');

module.exports = function () {
    gulp.src(['client/**/*.html', 'client/**/*.css', 'client/bower_components/**'], { base: './client' })
        .pipe(gulp.dest('dist/client/'));
    var env = process.env.NODE_ENV || 'development';
    gulp.src('config/' + env + '.js').pipe(rename('config.js')).pipe(gulp.dest('dist/client/'));
}
