// The name of each response payload should be model name defined in Request model schema.

module.exports = {
	Login: { // This name should be model name defined in request model.
		201: {
			_id: 'number',
			type: 'string',
			name: 'string',
			username: 'string'
		},
		401: {
			message: 'string',
			error: 'string'
		},
		400: {
			message: 'string',
			error: 'string'
		},
		500: {
			message: 'string',
			error: 'string'
		}
	}
}
