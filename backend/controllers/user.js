const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const { response } = require('../helpers/response');
const { enumResponse } = require('../helpers/enumResponse');

const createUser = async (req, res) => {
	let body;
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			body = { ok: false, msg: enumResponse.userExist };
			return response(res, 400, body);
		}

		user = new User(req.body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);
		await user.save();

		const token = await generateJWT(user.id, user.name);

		body = { ok: true, uid: user.id, name: user.name, token };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const updateUser = async (req, res) => {
	let body;
	try {
		const { name, email, password } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			body = { ok: false, msg: enumResponse.incorrectData };
			return responseresponse(400, body, res);
		}

		user.name = name;
		user.email = email;

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);
		await user.save();

		const token = await generateJWT(user.id, user.name);
		body = { ok: true, uid: user.id, name: user.name, token };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const deleteUser = async (req, res) => {
	let body;
	try {
		const { email } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			body = { ok: false, msg: enumResponse.incorrectData };
			return response(res, 400, body);
		}

		await user.delete();

		body = { ok: true, msg: enumResponse.deleteUser };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

module.exports = {
	createUser,
	updateUser,
	deleteUser
};
