const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: true
	}
})

const UserModel = mongoose.model('users', userShema)

module.exports = UserModel
