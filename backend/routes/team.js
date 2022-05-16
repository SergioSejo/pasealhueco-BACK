/*
    User rutes / team
    host + /api/team
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { createTeam, updateTeam, deleteTeam } = require('../controllers/team');

const router = Router();

router.post(
	'/create',
	[
		//middelwares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
		validateFields
	],
	createTeam
);

router.post(
	'/update',
	[
		//middelwares
		check('email', 'El email es obligatorio').isEmail(),
		validateFields
	],
	updateTeam
);

router.post(
	'/delete',
	[
		//middelwares
		check('email', 'El email es obligatorio').isEmail(),
		validateFields
	],
	deleteTeam
);

module.exports = router;
