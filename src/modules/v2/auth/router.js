import * as auth from './controller'
import requestModel from '../../../requestModel/v2/auth';
import {validation} from 'swagger-generator-koa'

export const baseUrl = '/auth'

export default [
	{
		method: 'POST',
		route: '/',
		handlers: [
			validation(requestModel[0]),
			auth.authUser
		]
	}
]
