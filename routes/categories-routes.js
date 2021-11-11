const express = require('express');
const { check } = require('express-validator');

const categoriesControllers = require('../controllers/categories-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', categoriesControllers.getAllCategories);

router.use(checkAuth);

router.post('/',
    check('categoryName').not().isEmpty()
    , categoriesControllers.postCategory);

router.patch('/:id',
    check('categoryName').not().isEmpty()
    , categoriesControllers.updateCategory);

router.delete('/:id', categoriesControllers.deleteCategory);

module.exports = router;