'use strict'

const Gulp = require('gulp')
const RequireDir = require('require-dir')

// Load tasks
RequireDir('./tasks')

Gulp.task('dev', ['dotenv', 'yaml2json', 'nodemon'])
Gulp.task('prod', ['pm2'])

Gulp.task('default', ['dev'])
