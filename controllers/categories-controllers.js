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


//create a category
const postCategory = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { categoryName } = req.body;
    const creator = req.userData.userId;

    let validCategory;
    try {
        validCategory = await Category.findOne({ categoryName });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not valid the category.',
            500
        );
        return next(error);
    }

    if (!(validCategory.length === 0)) {
        const error = new HttpError(
            'category already exist.',
            404
        );
        return next(error);
    }

    //create category
    const createdCategory = new Category({
        categoryName,
        creator
    });
    try {
        await createdCategory.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not save category.',
            500
        );
        return next(error);
    }

    res.status(202).json({ message: 'category is saved', category: createdCategory });
}


//update category
const updateCategory = async (req, res, next) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next(
            new HttpError(
                'invalid inputs passed, please check your data',
                422
            )
        );
    }

    const categoryId = req.param.id;
    const { categoryName } = req.body;

    try {
        await Category.findByIdAndUpdate(categoryId, { categoryName });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update category.',
            500
        );
        return next(error);
    }

    res.status(202).json({ message: 'category updated' });
}


//delete category function
const deleteCategory = async (req, res, next) => {

    const categoryId = req.params.id;
    let category;
    try {
        category = await Category.findById(categoryId);
        await Category.findByIdAndDelete(categoryId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete category',
            500
        );
        return next(error);
    }

    const categoryName = category.categoryName;

    //delete all the products with this category;
    let productsDeleted;
    try {
        productsDeleted = await Product.deleteMany({ productCategory: categoryName })
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete the prodcuts',
            500
        );
        return next(error);
    }


    res.json({ message: 'category and products deleted' });

}

exports.getAllCategories = getAllCategories;
exports.getCategoryById = getCategoryById;
exports.postCategory = postCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;