'use strict';

var gulp        = require('gulp');
var browserify  = require('browserify');
var tsify       = require('tsify');
var rename      = require('gulp-rename');
var source      = require('vinyl-source-stream');

module.exports = function () {
    var b = browserify({
        entries: 'src/app.ts',
        standalone: 'CitizenHack'
    });

    b.plugin(tsify);

    return b.bundle()
        .pipe(source('citizenhack.js'))
        .pipe(gulp.dest('./client/'));
}
