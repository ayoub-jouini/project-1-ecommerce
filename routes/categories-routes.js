const express = require('express');

const categoriesControllers = require('../controllers/categories-controllers');

const router = express.Router();

router.get('/', categoriesControllers.getAllCategories);

router.post('/', categoriesControllers.postCategory);

router.patch('/:id', categoriesControllers.updateCategory);

router.delete('/:id', categoriesControllers.deleteCategory);

module.exports = router;