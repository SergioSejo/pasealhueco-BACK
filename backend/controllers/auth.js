const bcrypt = require('bcryptjs');
const Player = require('../models/player');
const { generateJWT } = require('../helpers/jwt');
const { response } = require('../helpers/response');
const { enumGeneral } = require('../helpers/enumResponse');

const loginPlayer = async (req, res) => {
	let body;
	try {
		const { email, password } = req.body;
		let player = await Player.findOne({ email });
		if (!player) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		const validPassword = bcrypt.compareSync(password, player.password);
		if (!validPassword) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		const token = await generateJWT(player.id, player.name);

		body = { ok: true, uid: player.id, name: player.name, token };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const renewToken = async (req, res) => {
	const { uid, name } = req;

	const token = await generateJWT(uid, name);

	body = { ok: true, token, uid, name };
	return response(res, 200, body);
};

const newToken = async (req, res) => {
	const { uid, name } = req;

	const token = await generateJWT(uid, name);

	body = { ok: true, token, uid, name };
	return response(res, 200, body);
};

module.exports = {
	loginPlayer,
	renewToken,
	newToken
};
