'use-strict'
import * as user from './controller'
import { validation } from 'swagger-generator-koa'

import { ensureUser } from '../../../middleware/validators'
import requestModel from '../../../requestModel/v1/users';
export const baseUrl = '/users'

export default [
	{
		method: 'POST',
		route: '/',
		handlers: [
			validation(requestModel[0]),
			user.createUser
		]
	},
	{
		method: 'GET',
		route: '/',
		handlers: [
			ensureUser,
			user.getUsers
		]
	},
	{
		method: 'GET',
		route: '/:id',
		handlers: [
			ensureUser,
			validation(requestModel[2]),
			user.getUser
		]
	},
	{
		method: 'PUT',
		route: '/:id',
		handlers: [
			ensureUser,
			validation(requestModel[3]),
			user.updateUser
		]
	},
	{
		method: 'DELETE',
		route: '/:id',
		handlers: [
			ensureUser,
			validation(requestModel[4]),
			user.deleteUser
		]
	},
	{
		method: 'PATCH',
		route: '/_change-password',
		handlers: [
			ensureUser,
			user.changePassword
		]
	}
]
