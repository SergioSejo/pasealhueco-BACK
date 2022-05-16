/*
    User rutes / team
    host + /api/team
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { team_create, team_update, team_delete, team_getAll, team_getById } = require('../controllers/team');

const router = Router();

router.post(
	'/create',
	[
		//middelwares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		validateFields,
		validateJWT
	],
	team_create
);

router.post(
	'/update',
	[
		//middelwares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		validateFields,
		validateJWT
	],
	team_update
);

router.post(
	'/delete',
	[
		//middelwares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		validateFields,
		validateJWT
	],
	team_delete
);

router.get('/getAll', validateJWT, team_getAll);
router.get('/getById', validateJWT, team_getById);

module.exports = router;
