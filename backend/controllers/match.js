const Match = require('../models/match');
const { response } = require('../helpers/response');
const { enumGeneral, enumMatch } = require('../helpers/enumResponse');

const match_create = async (req, res) => {
	let body;
	try {
		let match = new Match(req.body);

		const newMatch = await match.save();

		body = { ok: true, msg: enumMatch.matchCreated, newMatch };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const match_update = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		let match = await Match.findById(id);
		if (!match) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return responseresponse(400, body, res);
		}

		//match.description = description ? description : match.description;

		const updatedMatch = await match.save();

		body = { ok: true, msg: enumMatch.matchUpdated, updatedMatch };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const match_delete = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		let match = await Match.findById(id);
		if (!match) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		await match.delete();

		body = { ok: true, msg: enumMatch.matchDeleted, name: match.name };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const match_getAll = async (req, res) => {
	let body;
	try {
		let matchs = await Match.find();
		if (!matchs) {
			body = { ok: false, msg: enumMatch.matchEmpty };
			return response(res, 200, body);
		}

		body = { ok: true, matchs };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const match_getByYear = async (req, res) => {
	let body;
	try {
		const { year } = req.query;
		if (!year) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let matchs = await Match.find({ year }).sort('matchDate').populate('team_1.team').populate('team_2.team');
		if (!matchs) {
			body = { ok: false, msg: enumMatch.matchEmpty };
			return response(res, 200, body);
		}

		body = matchs;
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const match_getById = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		if (!id) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let match = await Match.findById(id);
		if (!match) {
			body = { ok: false, msg: enumMatch.matchNoExist };
			return response(res, 200, body);
		}

		body = { ok: true, match };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

module.exports = {
	match_create,
	match_update,
	match_delete,
	match_getAll,
	match_getByYear,
	match_getById
};
