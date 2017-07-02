'use strict'

const Gulp = require('gulp')
const RequireDir = require('require-dir')

// Load tasks
RequireDir('./tasks')

Gulp.task('dev', ['lint', 'dotenv', 'yaml2json', 'nodemon'])
Gulp.task('prod', ['lint', 'pm2'])

Gulp.task('default', ['dev'])
