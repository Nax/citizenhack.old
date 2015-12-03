'use strict';

var gulp =  require('gulp');

gulp.task('default',    ['watch', 'server']);
gulp.task('server',                             require('./tasks/server'));
gulp.task('watch',      ['build'],              require('./tasks/watch'));
gulp.task('build',      ['typescript', 'copy']);
gulp.task('typescript',                         require('./tasks/typescript'));
gulp.task('copy',                               require('./tasks/copy'));
