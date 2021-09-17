const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String, required: true },
    productCategory: { type: mongoose.Types.ObjectId, required: true, ref: 'Category' },
    image: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    onStock: { type: Boolean, require: true },
    size: { type: Array, require: true },
    bestDesplay: { type: Boolean, require: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Product', productSchema);