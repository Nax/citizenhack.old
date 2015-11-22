'use strict'

var gulp    = require('gulp')

module.exports = function () {
    gulp.src(['src/**/*.html', 'src/**/*.css', 'src/bower_components/**'], { base: './src' })
        .pipe(gulp.dest('dist/'))
}
