/*
    Inserts rutes / insert
    host + /api/insert
*/

const { Router } = require('express');

const { response } = require('../../helpers/response');
const Team = require('../../models/team');
const Player = require('../../models/player');
const Match = require('../../models/match');
const teamsObj = require('../json/teams.json');
const playersObj = require('../json/player.json');
const matchesObj = require('../json/matches.json');

const router = Router();

const insert_mock = async (req, res) => {
	let body;
	try {
		//Insert Teams
		let teamsBBDD = teamsObj.map(function (team) {
			return { ...team, creationDate: new Date().getTime().toString() };
		});
		let resultTeams = await Team.insertMany(teamsBBDD);

		//Insert Players
		let indexTeams = -1;
		let playersBBDD = playersObj.map(function (player) {
			if (player.number != 9) {
				indexTeams++;
			}
			return { ...player, team: resultTeams[indexTeams]._id };
		});
		let resultPlayers = await Player.insertMany(playersBBDD);

		//Insert Macthes
		//Poner los id de team
		let matchesBBDD = matchesObj;
		matchesBBDD[0].team_1.team = resultTeams[0]._id;
		matchesBBDD[0].team_2.team = resultTeams[1]._id;

		matchesBBDD[1].team_1.team = resultTeams[2]._id;
		matchesBBDD[1].team_2.team = resultTeams[3]._id;

		matchesBBDD[2].team_1.team = resultTeams[3]._id;
		matchesBBDD[2].team_2.team = resultTeams[2]._id;

		matchesBBDD[3].team_1.team = resultTeams[1]._id;
		matchesBBDD[3].team_2.team = resultTeams[0]._id;
		//Poner los id de player
		matchesBBDD[0].team_1.scorers[0].id_player = resultPlayers[0]._id;
		matchesBBDD[0].team_2.scorers[0].id_player = resultPlayers[2]._id;

		matchesBBDD[2].team_1.scorers[0].id_player = resultPlayers[4]._id;
		matchesBBDD[2].team_2.scorers[0].id_player = resultPlayers[3]._id;

		matchesBBDD[3].team_2.scorers[0].id_player = resultPlayers[0]._id;
		matchesBBDD[3].team_2.scorers[1].id_player = resultPlayers[1]._id;

		let resultMatches = await Match.insertMany(matchesBBDD);

		body = { ok: true };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const delete_mock = async (req, res) => {
	let body;
	try {
		let resultTeams = await Team.deleteMany({});
		let resultPlayers = await Player.deleteMany({});
		let resultMatches = await Match.deleteMany({});

		body = { ok: true };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

router.post('/insert_mock', insert_mock);
router.post('/delete_mock', delete_mock);

module.exports = router;
