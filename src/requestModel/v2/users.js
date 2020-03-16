const GROUP = `Users V2`;
/**
 * File name for request and response model should be same as router file.
 * Define request model with there order in router js.
 * For example first api in user router is is create user so we define schema with key 0.
 */
module.exports = {
	// Here 0 is the order of api route file.
	0: {
		group: GROUP,
		model: 'GetUsers',
		description: 'Get users from database'
	}
};
