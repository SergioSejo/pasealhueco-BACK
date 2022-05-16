const bcrypt = require('bcryptjs');
const Team = require('../models/team');
const { response } = require('../helpers/response');
const { enumGeneral, enumTeam } = require('../helpers/enumResponse');

const team_create = async (req, res) => {
	let body;
	try {
		const { name } = req.body;
		let team = await Team.findOne({ name });
		if (team) {
			body = { ok: false, msg: enumTeam.teamExist };
			return response(res, 400, body);
		}

		team = new Team(req.body);

		const newTeam = await team.save();

		body = { ok: true, msg: enumTeam.teamCreated, newTeam };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const team_update = async (req, res) => {
	let body;
	try {
		const { id, name, description } = req.body;
		let team = await Team.findById(id);
		if (!team) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return responseresponse(400, body, res);
		}

		team.description = description ? description : team.description;

		const updatedTeam = await team.save();

		body = { ok: true, msg: enumTeam.teamUpdated, updatedTeam };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const team_delete = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		let team = await Team.findById(id);
		if (!team) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		await team.delete();

		body = { ok: true, msg: enumTeam.teamDeleted, name: team.name };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const team_getAll = async (req, res) => {
	let body;
	try {
		let teams = await Team.find();
		if (!teams) {
			body = { ok: true, msg: enumTeam.teamEmpty };
			return response(res, 200, body);
		}

		body = { ok: true, teams };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const team_getById = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		if (!id) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let team = await Team.findById(id);
		if (!team) {
			body = { ok: true, msg: enumTeam.teamNoExist };
			return response(res, 200, body);
		}

		body = { ok: true, team };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

module.exports = {
	team_create,
	team_update,
	team_delete,
	team_getAll,
	team_getById
};
