'use strict'
const Gulp = require('gulp')
const Nodemon = require('gulp-nodemon')

Gulp.task('nodemon', function () {
  const nodeArgs = []
  if (process.env.DEBUGGER) {
    nodeArgs.push('--inspect')
  }

  Nodemon({
    script: 'index.js',
    ignore: [
      'node_modules/',
      'test/'
    ],
    nodeArgs: nodeArgs
  }).on('restart', function (files) {
    console.log('change detected:', files)
  })
})
