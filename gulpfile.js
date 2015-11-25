'use strict';

var gulp =  require('gulp');

gulp.task('default',    ['watch', 'server']);
gulp.task('server',                             require('./tasks/server'));
gulp.task('watch',      ['serve'],              require('./tasks/watch'));
gulp.task('serve',      ['build'],              require('./tasks/serve'));
gulp.task('build',      ['typescript', 'copy'], require('./tasks/build'));
gulp.task('typescript',                         require('./tasks/typescript'));
gulp.task('copy',                               require('./tasks/copy'));
