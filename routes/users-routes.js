const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersControllers.getAllUsers);

router.get('/:id', usersControllers.getUserById);

router.post('/', usersControllers.postUser);

router.patch('/:id', usersControllers.updateUser);

router.delete('/:id', usersControllers.deleteUser);

module.exports = router;