require('babel-core/register')()
require('babel-polyfill')
require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })
require('./bin/server.js')
