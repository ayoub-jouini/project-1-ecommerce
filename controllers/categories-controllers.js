const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../middleware/http-error');
const Category = require('../models/category-model');
const Product = require('../models/products-model');


//get all the categories 
const getAllCategories = async (req, res, next) => {
    let categories;
    try {
        categories = await Category.find({});
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find categories.',
            500
        );
        return next(error);
    }

    if (categories.length === 0) {
        const error = new HttpError(
            'there is no categories.',
            404
        );
        return next(error);
    }

    res.json({ categories: categories.map(category => category.toObject({ getters: true })) })
}


//get a category by id
const getCategoryById = async (req, res, next) => {
    const categoryId = req.params.id
    let fCategory;
    try {
        fCategory = await Category.findById(categoryId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find categories.',
            500
        );
        return next(error);
    }

    if (fCategory.length === 0) {
        const error = new HttpError(
            'there is no categories with this id.',
            404
        );
        return next(error);
    }

    res.json({ category: fCategory.toObject({ getters: true }) })
}

const postCategory = () => {

}

const updateCategory = () => {

}

const deleteCategory = () => {

}

exports.getAllCategories = getAllCategories;
exports.getCategoryById = getCategoryById;
exports.postCategory = postCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;