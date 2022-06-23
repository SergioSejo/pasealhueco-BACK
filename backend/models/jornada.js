const { Schema, model } = require('mongoose');

const jornadaSchema = Schema({
	team_1: {
		id: {
			type: String,
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
		id: {
			type: String,
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
	matchDay: {
		type: String,
		require: true
	},
	matchHour: {
		type: String,
		require: true
	},
	place: {
		type: String,
		require: true
	}
});

module.exports = model('Jornada', jornadaSchema);
