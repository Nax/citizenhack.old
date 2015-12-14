'use strict';

var gulp    = require('gulp');

module.exports = function () {
    gulp.watch(['src/**'], ['build']);
}
