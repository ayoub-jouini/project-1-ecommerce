const express = require('express');

const productsControllers = require('../controllers/products-controllers');
const checkAuth = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', productsControllers.getAllProducts);

router.get('/bestProducts', productsControllers.getBestProducts);

router.get('/:category', productsControllers.getProductsByCategory);

router.get('/:category/:id', productsControllers.getProductById);

router.use(checkAuth);

router.post('/', fileUpload.single('image'), productsControllers.postProduct);

router.patch('/:category/:id', fileUpload.single('image'), productsControllers.updateProduct);

router.delete('/:category/:id', productsControllers.deleteProduct);

module.exports = router;