const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firsName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    image: { type: String, required: true },
    userType: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);