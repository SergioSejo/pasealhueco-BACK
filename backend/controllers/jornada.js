const Jornada = require('../models/jornada');
const { response } = require('../helpers/response');
const { enumGeneral, enumJornada } = require('../helpers/enumResponse');

const jornada_create = async (req, res) => {
	let body;
	try {
		let jornada = new Jornada(req.body);

		jornada.matchDate = new Date(`December 07, 2021 16:00:00`).getTime().toString();

		const newJornada = await jornada.save();

		body = { ok: true, msg: enumJornada.jornadaCreated, newJornada };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const jornada_update = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		let jornada = await Jornada.findById(id);
		if (!jornada) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return responseresponse(400, body, res);
		}

		//jornada.description = description ? description : jornada.description;

		const updatedJornada = await jornada.save();

		body = { ok: true, msg: enumJornada.jornadaUpdated, updatedJornada };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const jornada_delete = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		let jornada = await Jornada.findById(id);
		if (!jornada) {
			body = { ok: false, msg: enumGeneral.incorrectData };
			return response(res, 400, body);
		}

		await jornada.delete();

		body = { ok: true, msg: enumJornada.jornadaDeleted, name: jornada.name };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const jornada_getAll = async (req, res) => {
	let body;
	try {
		let jornadas = await Jornada.find();
		if (!jornadas) {
			body = { ok: true, msg: enumJornada.jornadaEmpty };
			return response(res, 200, body);
		}

		body = { ok: true, jornadas };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const jornada_getByYear = async (req, res) => {
	let body;
	try {
		const { year } = req.query;
		//AQUIIII
		console.log('req: ', req);
		if (!year) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let dateIni = new Date(`September 1, ${year} 03:24:00`).getTime().toString();
		let dateFin = new Date(`May 31, ${year + 1} 03:24:00`).getTime().toString();
		console.log('dateIni: ', dateIni);
		console.log('dateFin: ', dateFin);
		let jornadas = await Jornada.find({
			matchDate: {
				$gte: dateIni,
				$lt: dateFin
			}
		});
		if (!jornadas) {
			body = { ok: true, msg: enumJornada.jornadaEmpty };
			return response(res, 200, body);
		}

		body = { ok: true, jornadas };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

const jornada_getById = async (req, res) => {
	let body;
	try {
		const { id } = req.body;
		if (!id) {
			body = { ok: false, msg: enumGeneral.emptyData };
			return response(res, 400, body);
		}
		let jornada = await Jornada.findById(id);
		if (!jornada) {
			body = { ok: true, msg: enumJornada.jornadaNoExist };
			return response(res, 200, body);
		}

		body = { ok: true, jornada };
		return response(res, 201, body);
	} catch (error) {
		console.log(error);
		return response(res, 500);
	}
};

module.exports = {
	jornada_create,
	jornada_update,
	jornada_delete,
	jornada_getAll,
	jornada_getByYear,
	jornada_getById
};
