/*
    User rutes / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { createUser, updateUser, deleteUser, loginUser, renewToken} = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


router.post(
    '/create',
    [
        //middelwares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validateFields
    ],
    createUser);

router.post(
    '/update',
    [
        //middelwares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validateFields
    ],
    updateUser);

router.post(
    '/delete',
    [
        //middelwares
        check('email', 'El email es obligatorio').isEmail(),
        validateFields
    ],
    deleteUser);

router.post('/',
[
    //middelwares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
    validateFields
],
loginUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;