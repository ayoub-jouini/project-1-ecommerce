const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../middleware/http-error');
const User = require('../models/users-model');

const getAllUsers = async (req, res, next) => {

    let users;
    try {
        users = await User.find({});
    } catch {
        const error = new HttpError(
            'Something went wrong, could not find users.',
            500
        );
        return next(error);
    }

    res.json({ users: users.toObject({ getters: true }) });

}

const getUserById = () => {

}

const postUser = () => {

}

const updateUser = () => {

}

const deleteUser = () => {

}

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.postUser = postUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;