const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../middleware/http-error');
const User = require('../models/users-model');

const getAllUsers = async (req, res, next) => {

    let users;
    try {
        users = await User.find({});
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find users.',
            500
        );
        return next(error);
    }

    if (users.length === 0) {
        const error = new HttpError(
            'there is no users',
            404
        );
        return next(error);
    }

    res.json({ users: users.toObject({ getters: true }) });

}

const getUserById = async (req, res, next) => {

    const userId = req.params.id;
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            'there is no user.',
            404
        );
        return next(error);
    }

    res.json({ user: user.toObject({ getters: true }) })
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