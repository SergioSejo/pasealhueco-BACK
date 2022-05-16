const { Schema, model } = require('mongoose');

const teamSchema = Schema({
	name: {
		type: String,
		require: true,
		unique: true
	},
	description: {
		type: String
	},
	creationDate: {
		type: String,
		require: true
	}
});

module.exports = model('Team', teamSchema);
