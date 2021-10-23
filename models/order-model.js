const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhoneNumber: { type: String, required: true },
    userAdress: { type: String, required: true },
    productsIds: { type: Array, required: true },
    price: { type: Number, required: true },
    orderState: { type: String, required: true, default: "in progress" }
});

module.exports = mongoose.model('Order', orderSchema);