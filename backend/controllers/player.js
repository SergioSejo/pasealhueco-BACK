const bcrypt = require('bcryptjs');
const Player = require('../models/player');
const { generateJWT } = require('../helpers/jwt');
const { response } = require('../helpers/response');
const { enumGeneral, enumPlayer } = require('../helpers/enumResponse');

const player_create = async (req, res) => {
	let body;
	try {
		const { email, password } = req.body;
		let player = await Player.findOne({ email });
		if (player) {
			body = { ok: false, msg: enumPlayer.playerExist };
			return response(res, 400, body);
		}

		player = new Player(req.body);
		player.creationDate = new Date().getTime().toString();
		const salt = bcrypt.genSaltSync();
		player.password = bcrypt.hashSync(password, salt);
		await player.save();

		const token = await generateJWT(player.id, player.name);

		body = { ok: true, uid: player.id, name: player.name, token };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const player_update = async (req, res) => {
	let body;
	try {
		const { name, email, password, age, foot, team } = req.body;
		let player = await Player.findOne({ email });
		if (!player) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return responseresponse(400, body, res);
		}

		player.name = name ? name : player.name;
		player.email = email ? email : player.email;
		player.age = age ? age : player.age;
		player.foot = foot ? foot : player.foot;
		player.team = team ? team : player.team;

		if (password) {
			const salt = bcrypt.genSaltSync();
			player.password = bcrypt.hashSync(password, salt);
		}

		await player.save();

		const token = await generateJWT(player.id, player.name);
		body = { ok: true, uid: player.id, name: player.name, token };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const player_delete = async (req, res) => {
	let body;
	try {
		const { email } = req.body;
		let player = await Player.findOne({ email });
		if (!player) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		await player.delete();

		body = { ok: true, msg: enumPlayer.deletePlayer };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const player_getAll = async (req, res) => {
	let body;
	try {
		let players = await Player.find();
		if (!players) {
			body = { ok: true, msg: enumPlayer.emptyPlayers };
			return response(res, 200, body);
		}

		body = { ok: true, players };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const player_getById = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		if (!id) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let player = await Player.findById(id);
		if (!player) {
			body = { ok: true, msg: enumPlayer.playerNoExist };
			return response(res, 200, body);
		}

		body = { ok: true, player };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const player_getByEmail = async (req, res) => {
	let body;
	try {
		const { email } = req.body;
		if (!email) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let player = await Player.findOne({ email });
		if (!player) {
			body = { ok: true, msg: enumPlayer.playerNoExist };
			return response(res, 200, body);
		}

		body = { ok: true, player };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const player_getByTeam = async (req, res) => {
	let body;
	try {
		const { team } = req.body;
		if (!team) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let player = await Player.find({ team });
		if (!player) {
			body = { ok: true, msg: enumPlayer.playerNoExist };
			return response(res, 200, body);
		}

		body = { ok: true, player };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const prueba = async (req, res) => {
	let body;
	try {
		console.log(req.body);

		const fechaca = new Date();
		let partido = new Date('December 07, 2021 17:30:00').getTime().toString();

		let partido2 = new Date('February 15, 2022 16:00:00').getTime().toString();

		console.log('fechaca: ', fechaca);
		console.log('partido: ', partido);

		body = { ok: true, partido, partido2 };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

module.exports = {
	player_create,
	player_update,
	player_delete,
	player_getAll,
	player_getById,
	player_getByEmail,
	player_getByTeam,
	prueba
};
