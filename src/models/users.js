import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import config from '../../config'
import jwt from 'jsonwebtoken'

const User = new mongoose.Schema({
	type: {
		type: String,
		default: 'User'
	},
	name: {
		type: String
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})

User.pre('save', function preSave (next) {
	try {
		const user = this
		if (!user.isModified('password')) {
			return next()
		}
		let salt = bcrypt.genSaltSync(10)
		var hash = bcrypt.hashSync(user.password, salt)
		user.password = hash
		next(null)
	} catch (error) {
		next(error)
	}
})

User.methods.validatePassword = function validatePassword (password) {
	const user = this
	return new Promise((resolve, reject) => {
		try {
			let isMatch = bcrypt.compareSync(password, user.password)
			resolve(isMatch)
		} catch (error) {
			resolve(false)
		}
	})
}

User.methods.generateToken = function generateToken () {
	const user = this

	return jwt.sign({
		id: user.id
	}, config.token)
}

export default mongoose.model('user', User)
