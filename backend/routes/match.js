/*
    Match rutes / match
    host + /api/match
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const {
	match_create,
	match_update,
	match_delete,
	match_getAll,
	match_getByYear,
	match_getById
} = require('../controllers/match');

const router = Router();

router.post(
	'/create',
	[
		//middelwares
		check('team_1', 'El equipo 1 es obligatorio').not().isEmpty(),
		check('team_2', 'El equipo 2 es obligatorio').not().isEmpty(),
		check('matchDate', 'matchDate es obligatorio').not().isEmpty(),
		check('place', 'place es obligatorio').not().isEmpty(),
		validateFields,
		validateJWT
	],
	match_create
);

router.post(
	'/update',
	[
		//middelwares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		validateFields,
		validateJWT
	],
	match_update
);

router.post(
	'/delete',
	[
		//middelwares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		validateFields,
		validateJWT
	],
	match_delete
);

router.get('/getAll', validateJWT, match_getAll);
router.get('/getByYear', match_getByYear);
router.get('/getById', validateJWT, match_getById);

module.exports = router;
