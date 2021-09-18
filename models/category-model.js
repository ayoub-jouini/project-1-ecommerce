const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    products: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Product' }]
});

module.exports = mongoose.model('Category', categorySchema);