// The name of each response payload should be model name defined in Request model schema.

module.exports = {
	CreateUser: { // This name should be model name defined in request model.
		201: {
			message: 'string'
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
	},
	GetUsers: {
		200: [{
			_id: 'number',
			type: 'string',
			name: 'string',
			username: 'string'
		}],
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
	},
	UpdateUser: {
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
	},
	GetUserDetails: {
		200: {
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
	},
	DeleteUser: {
		204: {
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
};
