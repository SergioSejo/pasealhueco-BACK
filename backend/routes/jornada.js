/*
    Jornada rutes / jornada
    host + /api/jornada
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const {
	jornada_create,
	jornada_update,
	jornada_delete,
	jornada_getAll,
	jornada_getByYear,
	jornada_getById
} = require('../controllers/jornada');

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
	jornada_create
);

router.post(
	'/update',
	[
		//middelwares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		validateFields,
		validateJWT
	],
	jornada_update
);

router.post(
	'/delete',
	[
		//middelwares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		validateFields,
		validateJWT
	],
	jornada_delete
);

router.get('/getAll', validateJWT, jornada_getAll);
router.get('/getByYear', jornada_getByYear);
router.get('/getById', validateJWT, jornada_getById);

module.exports = router;
