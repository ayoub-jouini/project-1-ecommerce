const express = require('express');

const usersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', usersControllers.getAllUsers);

router.post('/singin', usersControllers.signIn);

router.post('/singup', usersControllers.signUp);

router.get('/:id', usersControllers.getUserById);

router.patch('/:id', usersControllers.updateUser);

router.delete('/:id', usersControllers.deleteUser);

module.exports = router;