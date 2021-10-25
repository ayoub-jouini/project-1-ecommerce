const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../middleware/http-error');
const User = require('../models/users-model');

const getAllUsers = async (req, res, next) => {

    //token

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

    //token 

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


//signUp function
const signUp = async (req, res, next) => {

    //admin validation


    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next(
            new HttpError(
                'invalid inputs passed, please check your data',
                422
            )
        );
    }

    const { firstName, lastName, email, password, userType } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
        );
        return next(error);
    }

    const createdUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email });
}



//signin function
const signIn = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next(
            new HttpError(
                'invalid inputs passed, please check your data',
                422
            )
        );
    }

    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please check your credentials and try again.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    //token
    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, "my-token-key");
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    res.status(201).json({ userId: existingUser.id, email: existingUser.email, token: token });
}

const updateUser = async (req, res, next) => {

}

const deleteUser = () => {

}

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.signIn = signIn;
exports.signUp = signUp;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;