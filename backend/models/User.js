const { Schema, model } = require('mongoose');

const userSchema = Schema({
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	},
	age: {
		type: String
	},
	foot: {
		type: String
	},
	team: {
		type: String
	}
});

module.exports = model('User', userSchema);
