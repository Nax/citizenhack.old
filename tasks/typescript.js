'use strict';

var gulp            = require('gulp');
var ts              = require('gulp-typescript');

module.exports = function (callback) {
    var tsProject = ts.createProject('tsconfig.json');

    return tsProject.src()
        .pipe(ts(tsProject))
        .pipe(gulp.dest('.'));
}
