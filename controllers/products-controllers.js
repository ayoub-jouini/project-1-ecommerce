const fs = require('fs');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../middleware/http-error');
const Product = require('../models/products-model');
const Category = require('../models/category-model');
const User = require('../models/users-model');


//get all the products function
const getAllProducts = async (req, res, next) => {
    let products;
    try {
        products = await Product.find({});
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the products.',
            500
        );
        return next(error);
    }

    if (products.length === 0) {
        const error = new HttpError(
            'there is no products',
            404
        );
        return next(error);
    }

    res.json({
        products: products.map(prod =>
            prod.toObject({ getters: true }))
    });

}


//get the best products function
const getBestProducts = async (req, res, next) => {
    let bestProducts;
    try {
        bestProducts = await Product.find({ bestDesplay: true });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the best products.',
            500
        );
        return next(error);
    }

    if (bestProducts.length === 0) {
        const error = new HttpError(
            'there is no best products',
            404
        );
        return next(error);
    }

    res.json({
        bestProducts: bestProducts.map(prod =>
            prod.toObject({ getters: true }))
    });
}


//get products by category function
const getProductsByCategory = async (req, res, next) => {
    const categoryName = req.params.category;
    let categories;
    try {
        categories = await Category.findOne({ categoryName }).populate("products");
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the category.',
            500
        );
        return next(error);
    }

    if (categories.length === 0 || categories.products.length === 0) {
        const error = new HttpError(
            'there is no products with this category',
            404
        );
        return next(error);
    }

    res.json({
        products: categories.products.map(prod => prod.toObject({ getters: true }))
    })
}


//get a product by id function
const getProductById = async (req, res, next) => {
    const productId = req.params.id;
    let product;
    try {
        product = await Product.findById(productId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the product.',
            500
        );
        return next(error);
    }

    if (product.length === 0) {
        const error = new HttpError(
            'there is no product whith this id.',
            500
        );
        return next(error);
    }

    res.json({ product: product.toObject({ getters: true }) });
}


//create a product function
const postProduct = async (req, res, next) => {


    //token 
    //image upload
    //user validation


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    // the requeste body
    const { productName,
        productCategory,
        description,
        price,
        onStock,
        size,
        bestDesplay,
        creator
    } = req.body;

    //category validation
    let validCategory;
    try {
        validCategory = await Category.findOne({ categoryName: productCategory })
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find category.',
            500
        );
        return next(error);
    }

    if (validCategory.length === 0) {
        const error = new HttpError(
            'category not found.',
            404
        );
        return next(error);
    }

    //user validation
    let validUser;
    try {
        validUser = await User.findById(creator);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        return next(error);
    }
    if (validUser.length === 0) {
        const error = new HttpError(
            'user not found.',
            404
        );
        return next(error);
    }


    //create the product
    const createdProduct = new Product({
        productName,
        productCategory,
        image: req.file.path,
        description,
        price,
        onStock,
        size,
        bestDesplay,
        creator
    })
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdProduct.save({ session: sess });
        validCategory.products.push(createdProduct);
        await validCategory.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not save the data.',
            500
        );
        return next(error);
    }
    res.status(201).json({ product: createdProduct });
}


//update product function
const updateProduct = async (req, res, next) => {


    //token 
    //image update and the old one remove
    //user validation



    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { productName,
        description,
        price,
        onStock,
        size,
        bestDesplay
    } = req.body;
    const productId = req.params.id;

    try {
        await Product.findByIdAndUpdate(productId, {
            productName, image/* uploade image */, description, price, onStock,
            size, bestDesplay
        })
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update the product.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "product updated" });
}


//delete product function 
const deleteProduct = async (req, res, next) => {
    const productId = req.params.id;

    //token 
    //image delete 
    //user validtion


    let deletedProduct;
    try {
        deletedProduct = await Product.findByIdAndDelete(productId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete product.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "deleted product" });
}


exports.getAllProducts = getAllProducts;
exports.getBestProducts = getBestProducts;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductById = getProductById;
exports.postProduct = postProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;