const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/singin',
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    usersControllers.signIn
);

router.use(checkAuth);

router.get('/', usersControllers.getAllUsers);

router.post('/create',
    check('firstName').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('email').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').not().isEmpty(),
    check('userType').not().isEmpty(),
    usersControllers.createUser);

router.get('/:id', usersControllers.getUserById);

router.patch('/:id',
    fileUpload.single('image'),
    check('firstName').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('email').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').not().isEmpty(),
    check('userType').not().isEmpty(),
    usersControllers.updateUser);

router.delete('/:id', usersControllers.deleteUser);

module.exports = router;