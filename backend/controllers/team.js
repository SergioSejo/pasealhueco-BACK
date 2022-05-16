const bcrypt = require('bcryptjs');
const Team = require('../models/team');
const { generateJWT } = require('../helpers/jwt');
const { response } = require('../helpers/response');
const { enumGeneral, enumTeam } = require('../helpers/enumResponse');

const createTeam = async (req, res) => {
	let body;
	try {
		const { name } = req.body;
		let team = await Team.findOne({ name });
		if (team) {
			body = { ok: false, msg: enumTeam.teamExist };
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

const updateTeam = async (req, res) => {
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

const deleteTeam = async (req, res) => {
	let body;
	try {
		const { email } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		await user.delete();

		body = { ok: true, msg: enumTeam.deleteTeam };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

module.exports = {
	createTeam,
	updateTeam,
	deleteTeam
};
