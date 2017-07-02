'use strict'

const Gulp = require('gulp')
const Eslint = require('gulp-eslint')

Gulp.task('lint', function () {
  return Gulp.src('*/**')
    .pipe(Eslint({
      fix: true
    }))
    .pipe(Eslint.format())
    .pipe(Eslint.failAfterError())
})
