const { Schema, model } = require('mongoose');

const teamSchema = Schema({
	name: {
		type: String,
		require: true,
		unique: true
	},
	creationDate: {
		type: String,
		require: true
	},
	description: {
		type: String
	}
});

module.exports = model('Team', teamSchema);
