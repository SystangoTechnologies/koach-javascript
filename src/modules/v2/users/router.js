import { ensureUser } from '../../../middleware/validators'
import * as user from './controller'

export const baseUrl = '/users'

export default [
	{
		method: 'GET',
		route: '/',
		handlers: [
			ensureUser,
			user.getUsers
		]
	}
]
