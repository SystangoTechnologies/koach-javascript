import User from '../../../models/users'
import constants from './../../../utils/constants'
import mongoose from 'mongoose'
/**
 * @api {post} /v1/users Create a new user
 * @apiPermission
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X POST -d '{ "user": { "username": "johndoe", "password": "secretpasas" } }' localhost:3000/v1/users
 *
 * @apiParam {Object} user          User object (required)
 * @apiParam {String} user.username Username.
 * @apiParam {String} user.password Password.
 *
 * @apiSuccess {Object}   users           User object
 * @apiSuccess {ObjectId} users._id       User id
 * @apiSuccess {String}   users.name      User name
 * @apiSuccess {String}   users.username  User username
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *          "_id": "56bd1da600a526986cf65c80"
 *          "name": "John Doe"
 *          "username": "johndoe"
 *       }
 *     }
 *
 * @apiError UnprocessableEntity Missing required parameters
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "status": 422,
 *       "error": "Unprocessable Entity"
 *     }
 */
export async function createUser(ctx) {
	const user = new User(ctx.request.body.user)
	try {
		let userData = await User.findOne({
			username: ctx.request.body.username
		});
		if(userData) {
			ctx.body = constants.MESSAGES.USER_ALREADY_EXIST;
			ctx.status = constants.STATUS_CODE.CONFLICT_ERROR_STATUS
			return;
		}
		await user.save()
		const token = user.generateToken()
		const response = user.toJSON()
		delete response.password
		ctx.body = {
			user: response
		}
		ctx.append('Authorization', token);
		ctx.status = constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS;
	} catch (error) {
		console.log('Error while creating user', error);
		ctx.body = error;
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

/**
 * @api {get} /v1/users Get all users
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X GET localhost:3000/v1/users
 *
 * @apiSuccess {Object[]} users           Array of user objects
 * @apiSuccess {ObjectId} users._id       User id
 * @apiSuccess {String}   users.name      User name
 * @apiSuccess {String}   users.username  User username
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "users": [{
 *          "_id": "56bd1da600a526986cf65c80"
 *          "name": "John Doe"
 *          "username": "johndoe"
 *       }]
 *     }
 *
 * @apiUse TokenError
 */
export async function getUsers(ctx) {
	try {
		const users = await User.find({}, '-password -__v')
		ctx.body = {
			users
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS;
	} catch (error) {
		ctx.body = error;
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

/**
 * @api {get} /v1/users/:id Get user by id
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X GET localhost:3000/v1/users/56bd1da600a526986cf65c80
 *
 * @apiSuccess {Object}   users           User object
 * @apiSuccess {ObjectId} users._id       User id
 * @apiSuccess {String}   users.name      User name
 * @apiSuccess {String}   users.username  User username
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *          "_id": "56bd1da600a526986cf65c80"
 *          "name": "John Doe"
 *          "username": "johndoe"
 *       }
 *     }
 *
 * @apiUse TokenError
 */
export async function getUser(ctx, next) {
	try {
		const user = await User.findById(ctx.params.id, '-password -__v')
		if (!user) {
			ctx.status = constants.STATUS_CODE.NO_CONTENT_STATUS
			ctx.body = {
				message: constants.MESSAGES.USER_NOT_FOUND
			}
			return
		}
		ctx.body = {
			user
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS;
	} catch (error) {
		ctx.body = error;
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

/**
 * @api {put} /v1/users/:id Update a user
 * @apiPermission
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X PUT -d '{ "user": { "name": "Cool new Name" } }' localhost:3000/v1/users/56bd1da600a526986cf65c80
 *
 * @apiParam {Object} user          User object (required)
 * @apiParam {String} user.name     Name.
 * @apiParam {String} user.username Username.
 *
 * @apiSuccess {Object}   users           User object
 * @apiSuccess {ObjectId} users._id       User id
 * @apiSuccess {String}   users.name      Updated name
 * @apiSuccess {String}   users.username  Updated username
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 CREATED
 *
 * @apiError UnprocessableEntity Missing required parameters
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "status": 422,
 *       "error": "Unprocessable Entity"
 *     }
 *
 * @apiUse TokenError
 */
export async function updateUser(ctx) {
	try {
		const user = ctx.request.body.user;
		await User.findOneAndUpdate({
			_id: mongoose.Types.ObjectId(ctx.params.id)
		}, {
			$set: {
				name: user.name
			}
		})
		ctx.status = constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS;
	} catch (error) {
		console.log('Error', error)
		ctx.body = error;
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

/**
 * @api {delete} /v1/users/:id Delete a user
 * @apiPermission
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X DELETE localhost:3000/v1/users/56bd1da600a526986cf65c80
 *
 * @apiSuccess {StatusCode} 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 * @apiUse TokenError
 */

export async function deleteUser(ctx) {
	try {
		await User.findByIdAndRemove(mongoose.Types.ObjectId(ctx.params.id));
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS;
		ctx.body = {
			success: true
		}
	} catch (error) {
		ctx.body = error;
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

/**
 * @api {patch} /v1/users/_change-password Upadete password of a user
 * @apiPermission
 * @apiVersion 1.0.0
 * @apiName changePassword
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X PATCH -d '{ "oldPassword":"oldPassword", "newPassword": "newPassword" }' localhost:3000/v1/users/_changePassword
 *
 * @apiSuccess {StatusCode} 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 * @apiUse TokenError
 */

export async function changePassword(ctx) {
	try {
		let oldPassword = ctx.request.body.oldPassword
		let newPassword = ctx.request.body.newPassword

		if(!newPassword || !oldPassword) {
			ctx.status = constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS
			return
		}

		let user = await User.findOne({
			_id: mongoose.Types.ObjectId(ctx.state.user.id)
		})

		let isMatch = await user.validatePassword(oldPassword)

		if(isMatch) {
			user.password = newPassword
			user.save();
			ctx.status = constants.STATUS_CODE.SUCCESS_STATUS;
			ctx.body = {
				success: true
			}
			return
		} else {
			ctx.body = {
				success: false
			}
			ctx.status = constants.STATUS_CODE.UNAUTHORIZED_ERROR_STATUS
			return
		}
	} catch (error) {
		ctx.body = error;
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}
