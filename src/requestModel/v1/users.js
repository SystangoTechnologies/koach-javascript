const Joi = require('@hapi/joi');
const GROUP = `Users V1`;
/**
 * File name for request and response model should be same as router file.
 * Define request model with there order in router js.
 * For example first api in user router is is create user so we define schema with key 0.
 */
module.exports = {
	// Here 0 is the order of api route file.
	0: {

		body: {
			type: Joi.string(),
			name: Joi.string().required(),
			username: Joi.string().required(),
			password: Joi.string().required()
		},
		model: 'CreateUser',
		group: GROUP,
		description: 'Create user and save in database'
	},
	1: {
		group: GROUP,
		model: 'GetUsers',
		description: 'Get users from database'
	},
	2: {
		path: {
			id: Joi.string().required()
		},
		group: GROUP,
		model: 'GetUserDetails',
		description: 'Get user details from database'
	},
	3: {
		path: {
			id: Joi.string().required()
		},
		body: {
			type: Joi.string(),
			name: Joi.string().required(),
			username: Joi.string().required()
		},
		model: 'UpdateUser',
		group: GROUP,
		description: 'Update user information'
	},
	4: {
		path: {
			id: Joi.string().required()
		},
		group: GROUP,
		model: 'DeleteUser',
		description: 'Delete user from database'
	}
};
