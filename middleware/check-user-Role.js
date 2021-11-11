const HttpError = require('../middleware/http-error');
const User = require('../models/users-model');

const checkUserRole = async (userType, userId) => {
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            'could not find user.',
            500
        );
        return next(error);
    }

    let valid = true;
    if (user.userType != userType) {
        valid = false;
    }

    return valid;
}

module.exports = checkUserRole;