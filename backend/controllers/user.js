const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { response } = require('../helpers/response');
const { enumGeneral, enumUser } = require('../helpers/enumResponse');

const createUser = async (req, res) => {
	let body;
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			body = { ok: false, msg: enumUser.userExist };
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
		const { name, email, password, age, foot, team } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return responseresponse(400, body, res);
		}

		user.name = name ? name : user.name;
		user.email = email ? email : user.email;
		user.age = age ? age : user.age;
		user.foot = foot ? foot : user.foot;
		user.team = team ? team : user.team;

		if (password) {
			const salt = bcrypt.genSaltSync();
			user.password = bcrypt.hashSync(password, salt);
		}

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
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		await user.delete();

		body = { ok: true, msg: enumUser.deleteUser };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const getUsers = async (req, res) => {
	let body;
	try {
		let users = await User.find();
		if (!users) {
			body = { ok: true, msg: enumUser.emptyUsers };
			return response(res, 200, body);
		}

		body = { ok: true, users };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const getUserById = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		if (!id) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let user = await User.findById(id);
		if (!user) {
			body = { ok: true, msg: enumUser.userNoExist };
			return response(res, 200, body);
		}

		body = { ok: true, user };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const getUserByEmail = async (req, res) => {
	let body;
	try {
		const { email } = req.body;
		if (!email) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let user = await User.findOne({ email });
		if (!user) {
			body = { ok: true, msg: enumUser.userNoExist };
			return response(res, 200, body);
		}

		body = { ok: true, user };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const getUserByTeam = async (req, res) => {
	let body;
	try {
		const { team } = req.body;
		if (!team) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let user = await User.find({ team });
		if (!user) {
			body = { ok: true, msg: enumUser.userNoExist };
			return response(res, 200, body);
		}

		body = { ok: true, user };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

module.exports = {
	createUser,
	updateUser,
	deleteUser,
	getUsers,
	getUserById,
	getUserByEmail,
	getUserByTeam
};
