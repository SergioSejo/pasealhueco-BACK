/*
    User rutes / user
    host + /api/user
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const {
	createUser,
	updateUser,
	deleteUser,
	getUsers,
	getUserById,
	getUserByEmail,
	getUserByTeam
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
	createUser
);

router.post(
	'/update',
	[
		//middelwares
		check('email', 'El email es obligatorio').isEmail(),
		validateFields
	],
	updateUser
);

router.post(
	'/delete',
	[
		//middelwares
		check('email', 'El email es obligatorio').isEmail(),
		validateFields
	],
	deleteUser
);

router.get('/getUsers', getUsers);
router.get('/getUserById', getUserById);
router.get('/getUserByEmail', getUserByEmail);
router.get('/getUserByTeam', getUserByTeam);

module.exports = router;
