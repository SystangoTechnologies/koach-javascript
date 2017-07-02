'use strict'

const Gulp = require('gulp')
const yaml = require('gulp-yaml')
const watch = require('gulp-watch')

Gulp.task('yaml2json', function () {
  Gulp.src('./swagger/swagger.yaml')
    .pipe(yaml({ space: 4 }))
    .pipe(Gulp.dest('./swagger'))

  return watch('./swagger/swagger.yaml', function () {
    return Gulp.src('./swagger/swagger.yaml')
      .pipe(yaml({ space: 4 }))
      .pipe(Gulp.dest('./swagger'))
  })
})
