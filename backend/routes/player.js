/*
    Player rutes / player
    host + /api/player
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const {
	player_create,
	player_update,
	player_delete,
	player_getAll,
	player_getById,
	player_getByEmail,
	player_getByTeam,
	prueba
} = require('../controllers/player');

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
	player_create
);

router.post(
	'/update',
	[
		//middelwares
		check('email', 'El email es obligatorio').isEmail(),
		validateFields,
		validateJWT
	],
	player_update
);

router.post(
	'/delete',
	[
		//middelwares
		check('email', 'El email es obligatorio').isEmail(),
		validateFields,
		validateJWT
	],
	player_delete
);

router.get('/getAll', validateJWT, player_getAll);
router.get('/getById', validateJWT, player_getById);
router.get('/getByEmail', validateJWT, player_getByEmail);
router.get('/getByTeam', validateJWT, player_getByTeam);

router.get('/prueba', prueba);

module.exports = router;
