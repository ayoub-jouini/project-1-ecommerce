const fs = require('fs');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Product = require('../models/products-model');
const Category = require('../models/category-model');
const User = require('../models/users-model');

const getAllProducts = () => {

}

const getBestProducts = () => {

}

const getProductsByCategory = () => {

}

const getProductById = () => {

}

const postProduct = () => {

}

const updateProduct = () => {

}

const deleteProduct = () => {

}

exports.getAllProducts = getAllProducts;
exports.getBestProducts = getBestProducts;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductById = getProductById;
exports.postProduct = postProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;