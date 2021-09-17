const express = require('express');

const productsControllers = require('../controllers/products-controllers');

const router = express.Router();

router.get('/', productsControllers.getAllProducts);

router.get('/bestProducts', productsControllers.getBestProducts);

router.get('/:category', productsControllers.getProductsByCategory);

router.get('/:category/:id', productsControllers.getProductById);

router.post('/', productsControllers.postProduct);

router.patch('/:category/:id', productsControllers.updateProduct);

router.delete('/:category/:id', productsControllers.deleteProduct);

module.exports = router;