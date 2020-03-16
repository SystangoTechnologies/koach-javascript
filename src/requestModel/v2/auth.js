import Joi from '@hapi/joi'
const GROUP= `Auth V2`;
/**
 * File name for request and response model should be same as router file.
 * Define request model with there order in router js.
 * For example first api in user router is is create user so we define schema with key 0.
 */
module.exports = {
	// Here 0 is the order of api route file.
	0: {
		body: {
			username: Joi.string().required(),
			password: Joi.string().required()
		},
		model: 'Login',
		group: GROUP,
		description: 'Login user into the system'
	}
};
