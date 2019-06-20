/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import app from '../bin/server'
import supertest from 'supertest'
import { should } from 'chai'
import { cleanDb, authUser } from './utils'

should()
const request = supertest.agent(app.listen())
const context = {}

describe('Auth', () => {
	before((done) => {
		cleanDb()
		authUser(request, (err, { user, token }) => {
			if (err) { return done(err) }

			context.user = user
			context.token = token
			done()
		})
	})

})
