const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { response } = require('../helpers/response');
const { enumGeneral } = require('../helpers/enumResponse');

const loginUser = async (req, res) => {
	let body;
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		const token = await generateJWT(user.id, user.name);

		body = { ok: true, uid: user.id, name: user.name, token };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const renewToken = async (req, res) => {
	const { uid, name } = req;

	const token = await generateJWT(uid, name);

	body = { ok: true, token };
	return response(res, 200, body);
};

module.exports = {
	loginUser,
	renewToken
};
