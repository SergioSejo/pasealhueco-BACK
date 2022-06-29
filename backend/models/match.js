const { Schema, model } = require('mongoose');

const matchSchema = Schema({
	team_1: {
		team: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
			require: true
		},
		score: {
			type: Number
		},
		scorers: [
			{
				id_player: {
					type: String,
					require: true
				},
				goals: {
					type: Number,
					require: true
				}
			}
		],
		assists: [
			{
				id_player: {
					type: String,
					require: true
				},
				assists: {
					type: Number,
					require: true
				}
			}
		]
	},
	team_2: {
		team: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
			require: true
		},
		score: {
			type: Number
		},
		scorers: [
			{
				id_player: {
					type: String,
					require: true
				},
				goals: {
					type: Number,
					require: true
				}
			}
		],
		assists: [
			{
				id_player: {
					type: String,
					require: true
				},
				assists: {
					type: Number,
					require: true
				}
			}
		]
	},
	journey: {
		type: Number,
		require: true
	},
	year: {
		type: Number,
		require: true
	},
	date: {
		type: String,
		require: true
	},
	place: {
		type: String,
		require: true
	}
});

module.exports = model('Match', matchSchema);
