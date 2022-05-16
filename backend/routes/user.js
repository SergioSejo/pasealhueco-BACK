/*
    User rutes / user
    host + /api/user
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const {
	user_create,
	user_update,
	user_delete,
	user_getAll,
	user_getById,
	user_getByEmail,
	user_getByTeam
} = require('../controllers/user');

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
	user_create
);

router.post(
	'/update',
	[
		//middelwares
		check('email', 'El email es obligatorio').isEmail(),
		validateFields
	],
	user_update
);

router.post(
	'/delete',
	[
		//middelwares
		check('email', 'El email es obligatorio').isEmail(),
		validateFields
	],
	user_delete
);

router.get('/getAll', user_getAll);
router.get('/getById', user_getById);
router.get('/getByEmail', user_getByEmail);
router.get('/getByTeam', user_getByTeam);

module.exports = router;
